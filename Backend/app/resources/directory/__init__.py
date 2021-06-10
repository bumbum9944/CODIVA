import json
from flask import jsonify, request, abort, Response
from flask_restful import Api, Resource
from flask_jwt_extended import jwt_required, get_jwt_identity
from database import connect_db


class DirectoryApi(Resource):
    @jwt_required()
    def get(self, user_id):
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
                sql = """select d.id, d.name, IFNULL(sv.url,"") as url, IFNULL(sv.cnt, 0) as cnt, d.created_date from directory as d 
left join (select s.directory_user_id, s.directory_name, c.url, count(*) as cnt from (select * from saved where directory_user_id=%s order by created_date desc LIMIT 18446744073709551615) as s left join codies as c on s.codi_id = c.id group by s.directory_name) as sv
on d.user_id=sv.directory_user_id and d.name=sv.directory_name where d.user_id=%s"""
                cursor.execute(sql, (user_id, user_id))
                res = cursor.fetchall()
                print(res)
            connection.commit()
        return jsonify(data=sorted(res, key=lambda x: x["created_date"]))

    @jwt_required()
    def post(self, user_id):
        if get_jwt_identity() != int(user_id):
            abort(
                Response(
                    status=401,
                    response=json.dumps({"message": "Unauthorized User"}),
                    mimetype="application/json",
                )
            )

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
        if not "new_name" in req or req["new_name"] == "":
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
                sql = "SELECT name FROM `directory` WHERE user_id=%s and id=%s"
                cursor.execute(sql, (user_id, dir_id))
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

                sql = "UPDATE `directory` SET name=%s WHERE user_id=%s and id=%s"
                cursor.execute(sql, (req["new_name"], user_id, dir_id))
            connection.commit()
        return jsonify(message=f"Successfully update directory name: {req['new_name']}")

    @jwt_required()
    def delete(self, user_id, dir_id):
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
                sql = "SELECT name FROM `directory` WHERE user_id=%s and id=%s"
                cursor.execute(sql, (user_id, dir_id))
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

                sql = "DELETE FROM `directory` WHERE user_id=%s and id=%s"
                cursor.execute(sql, (user_id, dir_id))
            connection.commit()
        return jsonify(message=f"Successfully deleted")
