import os
from dotenv import load_dotenv
from datetime import timedelta

load_dotenv(verbose=True)
DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_HOST = os.getenv("DB_HOST")
DB_PORT = int(os.getenv("DB_PORT"))
DB_NAME = os.getenv("DB_NAME")
ES_HOST = os.getenv("ES_HOST")
ES_USER = os.getenv("ES_USER")
ES_PASSWORD = os.getenv("ES_PASSWORD")
SECRET_KEY = os.getenv("SECRET_KEY")
JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")
JWT_TOKEN_LOCATION = ["headers"]
SWAGGER = {
    "doc_dir": "./app/docs/",
    "openapi": "3.0.0",
    "title": "Codiba API Documentation",
}
JWT_ACCESS_TOKEN_EXPIRES = timedelta(days=3)
