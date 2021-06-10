import os, json
from flask import jsonify, request, Blueprint, abort, Response
from database import connect_db
from flasgger import swag_from
from database.elasticsearch import connect_es

codi = Blueprint("codi", __name__, url_prefix="/codi")
path = os.path.join(os.getcwd(), "app/docs/codi")


@codi.route("/", methods=["GET"])
@swag_from(os.path.join(path, "get_codies.yml"))
def get_codies():
    query = request.args.to_dict()
    count = query["count"] if "count" in query else 20
    with connect_db() as connection:
        with connection.cursor() as cursor:
            sql = f"SELECT c.id, c.url, c.apparels, c.hits, l.cnt from `codies` as c LEFT JOIN (SELECT codi_id as id, count(*) as cnt FROM likes GROUP BY codi_id) as l ON c.id = l.id ORDER BY cnt DESC LIMIT {count}"
            cursor.execute(sql)
            res = cursor.fetchall()
            for r in res:
                r["apparels"] = json.loads(r["apparels"])
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


def make_match(key: str, value: str) -> dict:
    """
    [ make `match element` ]
    The return value is element of array named `matches` params
    in make_query function or make_nested_label function.
    """
    return {"match": {key: value}}


def make_nested_label(
    path: str, matches: list[dict], query_type: str = "filter"
) -> dict:
    """
    [ make `nested type label` ]
    The return value is element of array named `matches` params in make_query function.
    """
    return {
        "nested": {
            "path": f"{path}",
            "query": {"bool": {f"{query_type}": matches}},
        }
    }


def make_query(
    query_type: str, matches: list[dict], start_num: int = 0, size: int = 20
) -> dict:
    """
    [ make elastic search query ]
    The return value is a query of type dict
    for sending raw JSON queries to 'elasticsearch'.
    """
    return {
        "from": start_num,
        "size": size,
        "query": {
            "script_score": {
                "query": {"bool": {f"{query_type}": matches}},
                "script": {"source": "doc['like_cnt'].value + (doc['hits'].value*2)"},
            },
        },
    }


@codi.route("/search", methods=["POST"])
def search():
    query_param = request.args.to_dict()
    req = request.get_json(force=True)

    if (
        not "gender" in req
        or req["gender"] == ""
        or not "apparels" in req
        or type(req["apparels"]) != list
    ):
        abort(
            Response(
                status=400,
                response=json.dumps(
                    {"message": f"Invalid field value (gender, apparels)."}, indent=4
                ),
                mimetype="application/json",
            )
        )

    labels = []
    if req["gender"].lower() != "all":
        labels.append(make_match("gender", req["gender"][0].lower()))

    for apparel in req["apparels"]:
        matches = []
        matches.append(make_match("apparels.category", apparel["category"]))
        if apparel["color"].lower() != "all":
            matches.append(make_match("apparels.color", apparel["color"]))
        labels.append(make_nested_label("apparels", matches))

    query = make_query(
        "must", labels, query_param["from"] if "from" in query_param else 0
    )

    with connect_es() as es:
        result = es.search(query)
        codies = [{**x["_source"], "id": x["_id"]} for x in result["hits"]["hits"]]
        es.close()
    return jsonify(data=codies)
