import config
from elasticsearch import Elasticsearch


def connect_es():
    es = Elasticsearch(
        hosts=config.ES_HOST,
        http_auth=(config.ES_USER, config.ES_PASSWORD),
    )
    return es
