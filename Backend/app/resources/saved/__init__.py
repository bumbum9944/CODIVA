import json
from flask import jsonify, request, abort, Response
from flask_restful import Api, Resource
from flask_jwt_extended import jwt_required, get_jwt_identity
from database import connect_db


class SavedApi(Resource):
    @jwt_required()
    def get(self, user_id, dir_id=None):
        if get_jwt_identity() != int(user_id):
            abort(
                Response(
                    status=401,
                    response=json.dumps({"message": "Unauthorized User"}),
                    mimetype="application/json",
                )
            )
        if not dir_id:
            with connect_db() as connection:
                with connection.cursor() as cursor:
                    sql = "select codi_id from saved where directory_user_id=%s"
                    cursor.execute(sql, (user_id,))
                    res = cursor.fetchall()
                connection.commit()
            return jsonify(data=[v["codi_id"] for v in res])
        else:
            with connect_db() as connection:
                with connection.cursor() as cursor:
                    sql = "select name from directory where id=%s"
                    cursor.execute(sql, (dir_id,))
                    dir_name = cursor.fetchone()
                    if not dir_name:
                        abort(
                            Response(
                                status=400,
                                response=json.dumps(
                                    {"message": "Invalid directory id."}
                                ),
                                mimetype="application/json",
                            )
                        )
                    sql = "select c.id, c.url, c.gender, c.apparels, c.hits, c.likes_cnt from (select * from saved where directory_name=%s and directory_user_id=%s) as s left join codies as c on s.codi_id = c.id order by s.created_date desc"
                    cursor.execute(sql, (dir_name["name"], user_id))
                    res = cursor.fetchall()
                    for r in res:
                        r["apparels"] = json.loads(r["apparels"])
                connection.commit()
            return jsonify(data=res)

    @jwt_required()
    def post(self, user_id, dir_id, codi_id):
        if get_jwt_identity() != int(user_id):
            abort(
                Response(
                    status=401,
                    response=json.dumps({"message": "Unauthorized User"}),
                    mimetype="application/json",
                )
            )
        with connect_db() as connection:
            with connection.cursor() as cursor:
                sql = "select * from saved where directory_user_id=%s and codi_id=%s"
                cursor.execute(sql, (user_id, codi_id))
                if cursor.fetchone():
                    abort(
                        Response(
                            status=400,
                            response=json.dumps(
                                {"massage": "This is already saved code."}
                            ),
                            mimetype="application/json",
                        )
                    )
                sql = "select name from directory where id=%s"
                cursor.execute(sql, (dir_id,))
                dir_name = cursor.fetchone()
                if not dir_name:
                    abort(
                        Response(
                            status=400,
                            response=json.dumps({"message": "Invalid directory id."}),
                            mimetype="application/json",
                        )
                    )
                sql = "insert into saved(codi_id, directory_user_id, directory_name) values(%s, %s, %s)"
                cursor.execute(sql, (codi_id, user_id, dir_name["name"]))
            connection.commit()
        return jsonify(message="Successfully saved.")

    @jwt_required()
    def put(self, user_id, dir_id):
        if get_jwt_identity() != int(user_id):
            abort(
                Response(
                    status=401,
                    response=json.dumps({"message": "Unauthorized User"}),
                    mimetype="application/json",
                )
            )

        req = request.get_json(force=True)
        if (
            not "targets" in req
            or not "new_dir_name" in req
            or req["new_dir_name"] == ""
        ):
            abort(
                Response(
                    status=400,
                    response=json.dumps(
                        {
                            "message": "Invalid input: check that targets is an array value and directory name is not null."
                        }
                    ),
                    mimetype="application/json",
                )
            )
        with connect_db() as connection:
            with connection.cursor() as cursor:
                sql = "select * from directory where user_id=%s and name=%s"
                cursor.execute(sql, (user_id, req["new_dir_name"]))
                if not cursor.fetchone():
                    abort(
                        Response(
                            status=400,
                            response=json.dumps(
                                {
                                    "message": "The folder you are trying to move does not exist."
                                }
                            ),
                            mimetype="application/json",
                        )
                    )
                sql = "select name from directory where id=%s"
                cursor.execute(sql, (dir_id,))
                dir_name = cursor.fetchone()
                if not dir_name:
                    abort(
                        Response(
                            status=400,
                            response=json.dumps({"message": "Invalid directory id."}),
                            mimetype="application/json",
                        )
                    )
                sql = "update saved set directory_name=%s where directory_user_id=%s and directory_name=%s and codi_id in %s"
                cursor.execute(
                    sql,
                    (
                        req["new_dir_name"],
                        user_id,
                        dir_name["name"],
                        tuple(req["targets"]),
                    ),
                )
            connection.commit()
        return jsonify(
            message=f"Successfully update directory for {len(req['targets'])} images."
        )

    @jwt_required()
    def delete(self, user_id, dir_id=None):
        if get_jwt_identity() != int(user_id):
            abort(
                Response(
                    status=401,
                    response=json.dumps({"message": "Unauthorized User"}),
                    mimetype="application/json",
                )
            )

        req = request.get_json(force=True)
        if not dir_id and not "id" in req:
            abort(
                Response(
                    status=400,
                    response=json.dumps(
                        {
                            "message": "Invalid input: check that id is an integer or not null."
                        }
                    ),
                    mimetype="application/json",
                )
            )
        if dir_id and not "targets" in req:
            abort(
                Response(
                    status=400,
                    response=json.dumps(
                        {
                            "message": "Invalid input: check that targets is an array or not null."
                        }
                    ),
                    mimetype="application/json",
                )
            )
        with connect_db() as connection:
            with connection.cursor() as cursor:
                sql = "select name from directory where id=%s"
                cursor.execute(sql, (dir_id,))
                dir_name = cursor.fetchone()
                if not dir_name:
                    abort(
                        Response(
                            status=400,
                            response=json.dumps({"message": "Invalid directory id."}),
                            mimetype="application/json",
                        )
                    )
                if dir_id:
                    sql = "delete from saved where directory_user_id=%s and directory_name=%s and codi_id in %s"
                    cursor.execute(
                        sql, (user_id, dir_name["name"], tuple(req["targets"]))
                    )
                else:
                    sql = "delete from saved where directory_user_id=%s and codi_id=%s"
                    cursor.execute(sql, (user_id, req["id"]))
            connection.commit()
        return jsonify(
            message=f"Successfully delete {len(req['targets']) if dir_id else 1} images."
        )
