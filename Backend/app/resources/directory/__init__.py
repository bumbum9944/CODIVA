import json
from flask import jsonify, request, abort, Response
from flask_restful import Api, Resource
from flask_jwt_extended import jwt_required
from database import connect_db


class DirectoryApi(Resource):
    @jwt_required()
    def get(self, user_id):
        with connect_db() as connection:
            with connection.cursor() as cursor:
                sql = "SELECT name FROM `directory` WHERE user_id=%s ORDER BY created_date"
                cursor.execute(sql, (user_id))
                res = cursor.fetchall()
                print(res)
            connection.commit()
        return jsonify(data=[v["name"] for v in res])

    @jwt_required()
    def post(self, user_id):
        req = request.get_json(force=True)
        if not "name" in req or req["name"] == "":
            abort(
                Response(
                    status=400,
                    response=json.dumps(
                        {"message": "Directory name can't be null or empty space."}
                    ),
                    mimetype="application/json",
                )
            )
        with connect_db() as connection:
            with connection.cursor() as cursor:
                sql = "SELECT name FROM `directory` WHERE user_id=%s and name=%s"
                cursor.execute(sql, (user_id, req["name"]))
                if cursor.fetchone():
                    abort(
                        Response(
                            status=400,
                            response=json.dumps(
                                {"message": f"{req['name']} is already exists"}
                            ),
                            mimetype="application/json",
                        )
                    )
                sql = "INSERT INTO `directory`(user_id, name) VALUES(%s, %s)"
                cursor.execute(sql, (user_id, req["name"]))
            connection.commit()
        return jsonify(message=f"successfully created: {req['name']}")

    @jwt_required()
    def put(self, user_id):
        req = request.get_json(force=True)
        if (
            not "name" in req
            or req["name"] == ""
            or not "new_name" in req
            or req["new_name"] == ""
        ):
            abort(
                Response(
                    status=400,
                    response=json.dumps(
                        {"message": "Directory name can't be null or empty space."}
                    ),
                    mimetype="application/json",
                )
            )
        with connect_db() as connection:
            with connection.cursor() as cursor:
                sql = "SELECT name FROM `directory` WHERE user_id=%s and name=%s"
                cursor.execute(sql, (user_id, req["name"]))
                if not cursor.fetchone():
                    abort(
                        Response(
                            status=400,
                            response=json.dumps(
                                {"message": "A directory that does not exist."}
                            ),
                            mimetype="application/json",
                        )
                    )

                sql = "UPDATE `directory` SET name=%s WHERE user_id=%s and name=%s"
                cursor.execute(sql, (req["new_name"], user_id, req["name"]))
            connection.commit()
        return jsonify(
            message=f"Successfully update directory name: {req['name']} -> {req['new_name']}"
        )

    @jwt_required()
    def delete(self, user_id):
        req = request.get_json(force=True)
        if not "name" in req or req["name"] == "":
            abort(
                Response(
                    status=400,
                    response=json.dumps(
                        {"message": "Directory name can't be null or empty space."}
                    ),
                    mimetype="application/json",
                )
            )
        with connect_db() as connection:
            with connection.cursor() as cursor:
                sql = "SELECT name FROM `directory` WHERE user_id=%s and name=%s"
                cursor.execute(sql, (user_id, req["name"]))
                if not cursor.fetchone():
                    abort(
                        Response(
                            status=400,
                            response=json.dumps(
                                {"message": "A directory that does not exist."}
                            ),
                            mimetype="application/json",
                        )
                    )

                sql = "DELETE FROM `directory` WHERE user_id=%s and name=%s"
                cursor.execute(sql, (user_id, req["name"]))
            connection.commit()
        return jsonify(message=f"Successfully deleted: {req['name']}")
