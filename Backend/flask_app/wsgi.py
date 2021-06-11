import os
from app import create_app

app = create_app()

if __name__ == "__main__":
    app.run(
        "0.0.0.0", 5000, debug=(True if os.getenv("ENV_TYPE") == "local" else False)
    )
