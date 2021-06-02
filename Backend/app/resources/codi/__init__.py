import json
from flask import jsonify, request, Blueprint, abort, Response
from database import connect_db
from flasgger import swag_from

codi = Blueprint("codi", __name__, url_prefix="/codi")


@codi.route("/", methods=["GET"])
def get_codies():
    pass


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
