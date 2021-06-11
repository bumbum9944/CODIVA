import os, json, sys
from database import connect_db
from database.elasticsearch import connect_es

sys.path.append(
    os.path.dirname(
        os.path.abspath(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))
    )
)

"""
Insert Doc in Index used bulk command
curl -XPOST -u {user}:{password} -s -H "Content-Type:application/x-ndjson" "https://search-codiba-es-joddqdi6djcuwqcb4ctxjxxtru.ap-northeast-2.es.amazonaws.com/_bulk" --data-binary @bulk_data.json
"""


def make_bulk_data():
    with open(os.path.join(os.getcwd(), "database", "data", "codies.json"), "r") as f:
        json_data = json.load(f)
        count = 1
        for data in json_data:
            index = {"index": {"_index": "codies", "_id": f"{data['id']+1}"}}
            with open(
                os.path.join(os.getcwd(), "database", "data", "bulk_data.json"), "a"
            ) as bf:
                json.dump(index, bf)
                bf.write("\n")
            gender = "m" if data["url"].split("/")[-1].startswith("m") else "w"
            doc = {
                "gender": gender,
                "url": data["url"],
                "apparels": data["apparels"],
                "hits": 0,
                "like_cnt": 0,
            }
            with open(
                os.path.join(os.getcwd(), "database", "data", "bulk_data.json"), "a"
            ) as bf:
                json.dump(doc, bf)
                bf.write("\n")
            count += 1
            print(data)
        print(count)


def update_db(fname: str):
    with connect_db() as connection:
        with connection.cursor() as cursor:
            with open(os.path.join(fname), "r") as f:
                json_data = json.load(f)
                docs, cache = [], {}
                for data in json_data:
                    print(data)
                    print("\n")
                    gender = "m" if data["url"].split("/")[-1].startswith("m") else "w"
                    if not data["url"] in cache:
                        cache[data["url"]] = data["id"]
                        doc = (
                            data["id"] + 1,
                            data["url"],
                            gender,
                            json.dumps(data["apparels"]),
                        )
                        docs.append(doc)
                print(len(docs))
                for doc in docs:
                    sql = "INSERT INTO `codies`(id, url, gender, apparels) VALUES(%s, %s, %s, %s)"
                    cursor.execute(sql, doc)
        connection.commit()


if __name__ == "__main__":
    make_bulk_data()
    update_db()
