import config, pymysql

# Connection pool
connection = pymysql.connect(
    host=config.DB_HOST,
    port=int(config.DB_PORT),
    user=config.DB_USER,
    password=config.DB_PASSWORD,
    database=config.DB_NAME,
    charset="utf8mb4",
    cursorclass=pymysql.cursors.DictCursor,
)
