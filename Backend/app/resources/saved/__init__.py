import json
from flask import jsonify, request, abort, Response
from flask_restful import Api, Resource
from flask_jwt_extended import jwt_required, get_jwt_identity
from database import connect_db


class SavedApi(Resource):
    @jwt_required()
    def get(self, user_id, dir_name=None):
        print(user_id, dir_name)
        if not dir_name:
            with connect_db() as connection:
                with connection.cursor() as cursor:
                    sql = "select codi_id from saved where directory_user_id=%s group by codi_id"
                    cursor.execute(sql, (user_id,))
                    res = cursor.fetchall()
                connection.commit()
            return jsonify(data=[v["codi_id"] for v in res])
        else:
            with connect_db() as connection:
                with connection.cursor() as cursor:
                    sql = "select c.url from saved as s left join codies as c on s.codi_id = c.id where s.directory_name=%s and s.directory_user_id=%s order by s.created_data desc"
                    cursor.execute(sql, (dir_name, user_id))
                    res = cursor.fetchall()
                connection.commit()
            return jsonify(data=[v["url"] for v in res])

    @jwt_required()
    def post(self, user_id, dir_name, codi_id):
        with connect_db() as connection:
            with connection.cursor() as cursor:
                sql = "select * from saved where directory_user_id=%s and directory_name=%s and codi_id=%s"
                cursor.execute(sql, (user_id, dir_name, codi_id))
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

                sql = "insert into saved(codi_id, directory_user_id, directory_name) values(%s, %s, %s)"
                cursor.execute(sql, (codi_id, user_id, dir_name))
            connection.commit()
        return jsonify(message="Successfully saved.")

    @jwt_required()
    def put(self, user_id, dir_name):
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
                sql = "update saved set directory_name=%s where directory_user_id=%s and directory_name=%s and codi_id in %s"
                cursor.execute(
                    sql, (req["new_dir_name"], user_id, dir_name, tuple(req["targets"]))
                )
            connection.commit()
        return jsonify(
            message=f"Successfully update directory for {len(req['targets'])} images."
        )

    @jwt_required()
    def delete(self, user_id, dir_name):
        req = request.get_json(force=True)
        if not "targets" in req:
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
                sql = "delete from saved where directory_user_id=%s and directory_name=%s and codi_id in %s"
                cursor.execute(sql, (user_id, dir_name, tuple(req["targets"])))
            connection.commit()
        return jsonify(message=f"Successfully delete {len(req['targets'])} images.")
