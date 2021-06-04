import config
from flask import Flask, request
from flask_cors import CORS
from flask_restful import Api
from flask_jwt_extended import JWTManager
from flasgger import Swagger

jwt = JWTManager()
swagger = Swagger()
api = Api()


def create_app():
    app = Flask(__name__)
    app.config.from_object(config)

    from .resources import auth, codi, like, directory

    app.register_blueprint(auth.auth)
    app.register_blueprint(codi.codi)

    api.add_resource(like.LikeApi, "/like/<user_id>", "/like/<user_id>/<codi_id>")
    api.add_resource(directory.DirectoryApi, "/directory/<user_id>")

    # extention
    jwt.init_app(app)
    swagger.init_app(app)
    api.init_app(app)
    CORS(app, supports_credentials=True)

    @app.route("/")
    def index():
        return "Hello World"

    return app
