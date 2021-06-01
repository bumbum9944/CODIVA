import config
from flask import Flask, request
from flask_cors import CORS
from flask_restful import Api
from resources.auth import jwt, auth


def create_app():
    # Flask 객체 app 생성 및 config 변수 적용
    app = Flask(__name__)
    # app object에 config 적용
    app.config.from_object(config)
    # jwt 적용을 위한 JWTManager 적용
    jwt.init_app(app)
    # auth 객체 blueprint 등록
    app.register_blueprint(auth, url_prefix="/auth")
    # api 설정 및 적용
    api = Api(app)
    CORS(app, supports_credentials=True)
    # set_api_resources(api)
    # db 적용 및 migrate
    # db.init_app(app)
    # db.create_all(app=app)
    # migrate.init_app(app, db)

    @app.route("/")
    def index():
        return "Hello World"

    return app
