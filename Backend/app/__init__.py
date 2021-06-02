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

    from .resources import auth, codi

    app.register_blueprint(auth.auth)
    app.register_blueprint(codi.codi)

    # extention
    jwt.init_app(app)
    swagger.init_app(app)
    CORS(app, supports_credentials=True)

    @app.route("/")
    def index():
        return "Hello World"

    return app
