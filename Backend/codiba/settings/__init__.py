from .base import *

if os.environ.get("DJANGO_DEVELOPMENT", "development") == "prod":
    from .production import *
else:
    from .development import *
