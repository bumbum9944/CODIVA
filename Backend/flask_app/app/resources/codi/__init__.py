import os, json, ndjson
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
            sql = f"SELECT * from `codies` ORDER BY `likes_cnt` DESC, `hits` DESC LIMIT {count}"
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
    keywords = {
        "cardigan": "cardigan",
        "coat": "coat",
        "jacket": "jacket",
        "vest": "vest",
        "tee(short)": "short_sleeved_tee",
        "tee(long)": "long_sleeved_tee",
        "sleeveless": "sleeveless",
        "mtm": "mtm",
        "hood": "hood",
        "shirts": "shirts",
        "jeans": "jeans",
        "leggings": "leggings",
        "slacks": "slacks",
        "skirts": "skirts",
        "training": "training",
        "one-piece": "onepiece",
    }
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
        matches.append(make_match("apparels.category", keywords[apparel["category"]]))
        if apparel["color"].lower() != "all":
            matches.append(make_match("apparels.color", apparel["color"]))
        labels.append(make_nested_label("apparels", matches))

    query = make_query(
        "must", labels, query_param["from"] if "from" in query_param else 0
    )

    with connect_es() as es:
        result = es.search(query)
        codies = [{**x["_source"], "id": int(x["_id"])} for x in result["hits"]["hits"]]
        es.close()
    return jsonify(data=codies)


def make_update_label(index: str, id: int) -> dict:
    return {"update": {"_id": str(id), "_index": index}}


def make_doc_label(doc: dict) -> dict:
    return {"doc": doc}


@codi.route("/synchronize", methods=["POST"])
def synchronize_db_es():
    """
    [추가 보완할 사안]
    1. 추후 리팩토링할 때, 관리자 계정 설정까지 해서,
    관리자만 해당 작업을 요청할 수 있도록 설정할 것

    2. from, size를 params로 받아서 동기화 작업을 분기로 나누어 진행하도록 할 것
    """
    req = request.get_json(force=True)
    if not "index" in req:
        abort(
            Response(
                status=400,
                response=json.dumps(
                    {"message": f"Invalid field value (index)."}, indent=4
                ),
                mimetype="application/json",
            )
        )

    body = []
    with connect_db() as db:
        with db.cursor() as cursor:
            bulk_query = {}
            sql = "SELECT count(*) as total FROM `codies`"
            cursor.execute(sql)
            total = cursor.fetchone()["total"]
            for i in range(1, total + 1, 10000):
                sql = "SELECT * FROM `codies` WHERE id >= %s LIMIT 10000"
                cursor.execute(sql, (i,))
                result = cursor.fetchall()
                # print(result)
                for docs in result:
                    doc = {key: val for key, val in docs.items() if key != "id"}
                    doc["apparels"] = json.loads(doc["apparels"])
                    body += [
                        make_update_label(req["index"], docs["id"]),
                        make_doc_label(doc),
                    ]
                result = ndjson.dumps(body)
                with connect_es() as es:
                    res = es.bulk(ndjson.dumps(body))
        db.commit()
    return jsonify(res=res)
