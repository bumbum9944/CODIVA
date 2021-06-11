import json
from flask import jsonify, request, abort, Response
from flask_restful import reqparse, Api, Resource
from flask_jwt_extended import jwt_required, get_jwt_identity
from database import connect_db
from database.elasticsearch import connect_es


class LikeApi(Resource):
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
                sql = "SELECT * FROM `likes` WHERE `user_id`=%s"
                cursor.execute(sql, (user_id,))
                res = cursor.fetchall()
            connection.commit()
        return jsonify(user_like_codies=[v["codi_id"] for v in res])

    @jwt_required()
    def post(self, user_id, codi_id):
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
                sql = "SELECT * FROM `likes` WHERE `user_id`=%s and `codi_id`=%s"
                cursor.execute(sql, (user_id, codi_id))
                if cursor.fetchone():
                    abort(
                        Response(
                            status=400,
                            response=json.dumps(
                                {"message": "This user already like this codi."}
                            ),
                            mimetype="application/json",
                        )
                    )

                sql = "INSERT INTO `likes`(user_id, codi_id) VALUES(%s, %s)"
                cursor.execute(sql, (user_id, codi_id))

                sql = "UPDATE `codies` SET likes_cnt=likes_cnt+1 WHERE id=%s"
                cursor.execute(sql, (codi_id,))

                with connect_es() as es:
                    es.update(
                        "codies", codi_id, {"script": "ctx._source.like_cnt += 1"}
                    )
                    es.close()

            connection.commit()
        return jsonify(message="Successfully created")

    def put(self):
        pass

    @jwt_required()
    def delete(self, user_id, codi_id):
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
                sql = "SELECT * FROM `likes` WHERE `user_id`=%s and `codi_id`=%s"
                cursor.execute(sql, (user_id, codi_id))
                if not cursor.fetchone():
                    abort(
                        Response(
                            status=400,
                            response=json.dumps({"message": "Invalid request"}),
                            mimetype="application/json",
                        )
                    )

                sql = "DELETE FROM `likes` WHERE user_id=%s and codi_id=%s"
                cursor.execute(sql, (user_id, codi_id))

                sql = "UPDATE `codies` SET likes_cnt=likes_cnt-1 WHERE id=%s"
                cursor.execute(sql, (codi_id,))

                with connect_es() as es:
                    es.update(
                        "codies", codi_id, {"script": "ctx._source.like_cnt -= 1"}
                    )
                    es.close()

            connection.commit()
        return jsonify(message="Successfully deleted")
