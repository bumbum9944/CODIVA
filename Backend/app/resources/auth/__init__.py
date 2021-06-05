import os, json
from flask import jsonify, request, Blueprint, abort, Response
from flask_jwt_extended import create_access_token
from werkzeug.security import generate_password_hash, check_password_hash
from database import connect_db
from flasgger import swag_from

auth = Blueprint("auth", __name__, url_prefix="/auth")
path = os.path.join(os.getcwd(), "app/docs/auth")


@auth.route("/register", methods=["POST"])
@swag_from(os.path.join(path, "register.yml"))
def register():
    req = request.get_json(force=True)
    if (
        not "email" in req
        or req["email"] == ""
        or not "password" in req
        or req["password"] == ""
        or not "name" in req
        or req["name"] == ""
    ):
        abort(
            Response(
                status=400,
                response=json.dumps(
                    {"message": "email, password, and name is not to be NULL."},
                    indent=4,
                ),
                mimetype="application/json",
            )
        )

    with connect_db() as connection:
        with connection.cursor() as cursor:
            sql = "SELECT `email` FROM `users` WHERE `email`=%s"
            cursor.execute(sql, (req["email"],))
            if cursor.fetchone():
                abort(
                    Response(
                        status=400,
                        response=json.dumps(
                            {"message": f"{req['email']} has already registered."},
                            indent=4,
                        ),
                        mimetype="application/json",
                    )
                )
            sql = (
                "INSERT INTO `users` (`email`, `password`, `name`) VALUES (%s, %s, %s)"
            )
            cursor.execute(
                sql,
                (req["email"], generate_password_hash(req["password"]), req["name"]),
            )
        connection.commit()

        with connection.cursor() as cursor:
            sql = "SELECT `id` FROM `users` WHERE `email`=%s"
            cursor.execute(sql, (req["email"],))
            result = cursor.fetchone()

            sql = "INSERT INTO `directory` (`user_id`) VALUES (%s)"
            cursor.execute(sql, (result["id"],))
        connection.commit()

    return jsonify(message=f"{req['email']} is successfully registered.")


@auth.route("/login", methods=["POST"])
@swag_from(os.path.join(path, "login.yml"))
def login():
    req = request.get_json(force=True)
    if (
        not "email" in req
        or req["email"] == ""
        or not "password" in req
        or req["password"] == ""
    ):
        abort(400)
        abort(Response("email and password can not be NULL."))

    with connect_db() as connection:
        with connection.cursor() as cursor:
            sql = "SELECT * FROM `users` WHERE `email`=%s"
            cursor.execute(sql, (req["email"],))
            result = cursor.fetchone()
            if not result:
                abort(
                    Response(
                        status=400,
                        response=json.dumps(
                            {"message": f"{req['email']} is not registered."}, indent=4
                        ),
                        mimetype="application/json",
                    )
                )
            if not check_password_hash(result["password"], req["password"]):
                abort(
                    Response(
                        status=401,
                        response=json.dumps({"message": "Invalid password"}, indent=4),
                        mimetype="application/json",
                    )
                )

    access_token = create_access_token(identity=req["email"])
    return jsonify(
        access_token=access_token,
        user={"user_name": result["name"], "user_id": result["id"]},
    )
