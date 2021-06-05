import os, json
from flask import jsonify, request, Blueprint, abort, Response
from database import connect_db
from flasgger import swag_from

codi = Blueprint("codi", __name__, url_prefix="/codi")
path = os.path.join(os.getcwd(), "app/docs/codi")


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
        connection.commit()
    return jsonify(hits=res["hits"] + 1)


@codi.route("/match", methods=["POST"])
def search():
    pass
