import os, json
from flask import jsonify, request, Blueprint, abort, Response
from database import connect_db
from flasgger import swag_from
from database.elasticsearch import connect_es

codi = Blueprint("codi", __name__, url_prefix="/codi")
path = os.path.join(os.getcwd(), "app/docs/codi")


def make_match(key, value):
    return {"match": {key: value}}


labels = json.dumps(
    {
        "nested": {
            "path": "apparels",
            "query": {"bool": {"filter": []}},
        }
    }
)

query = json.dumps(
    {
        "size": 20,
        "query": {
            "function_score": {
                "query": {"bool": {"must": []}},
                "script_score": {
                    "script": {
                        "source": "doc['like_cnt'].value + (doc['hits'].value*2)"
                    }
                },
            },
        },
    }
)


@codi.route("/", methods=["GET"])
@swag_from(os.path.join(path, "get_codies.yml"))
def get_codies():
    query = request.args.to_dict()
    count = query["count"] if "count" in query else 20
    with connect_db() as connection:
        with connection.cursor() as cursor:
            sql = f"SELECT c.id, c.url, c.labels, c.hits, l.cnt from `codies` as c LEFT JOIN (SELECT codi_id as id, count(*) as cnt FROM likes GROUP BY codi_id) as l ON c.id = l.id ORDER BY cnt DESC LIMIT {count}"
            cursor.execute(sql)
            res = cursor.fetchall()
            for r in res:
                r["labels"] = json.loads(r["labels"])
        connection.commit()
    return jsonify(data=res)


@codi.route("/<codi_id>", methods=["PUT"])
def hit(codi_id):
    with connect_db() as connection:
        with connection.cursor() as cursor:
            sql = "SELECT `hits` FROM `codies` WHERE id=%s"
            cursor.execute(sql, (codi_id,))
            res = cursor.fetchone()
            if not res:
                abort(
                    Response(
                        status=400,
                        response=json.dumps(
                            {"message": f"{codi_id} is invalid codi_id"}, indent=4
                        ),
                        mimetype="application/json",
                    )
                )

            sql = "UPDATE `codies` SET `hits`=%s WHERE id=%s"
            cursor.execute(sql, (res["hits"] + 1, codi_id))

            with connect_es() as es:
                es.update("codies", codi_id, {"script": "ctx._source.hits += 1"})
                es.close()

        connection.commit()
    return jsonify(hits=res["hits"] + 1)


@codi.route("/search", methods=["POST"])
def search():
    query_param = request.args.to_dict()
    req = request.get_json(force=True)

    q = json.loads(query)
    q["from"] = query_param["from"] if "from" in query_param else 0
    q["query"]["function_score"]["query"]["bool"]["must"].append(
        make_match("gender", req["gender"])
    )

    for apparel in req["apparels"]:
        label = json.loads(labels)
        label["nested"]["query"]["bool"]["filter"].append(
            make_match("apparels.category", apparel["category"])
        )
        if apparel["color"] != "all":
            label["nested"]["query"]["bool"]["filter"].append(
                make_match("apparels.color", apparel["color"])
            )
        q["query"]["function_score"]["query"]["bool"]["must"].append(label)
    with connect_es() as es:
        result = es.search(q)
        result = list(
            map(
                lambda x: dict(x["_source"], **{"id": int(x["_id"])}),
                result["hits"]["hits"],
            )
        )
        es.close()
    return jsonify(data=result)
