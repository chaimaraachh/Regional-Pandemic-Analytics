import os

KEYCLOAK_ADMIN_USERNAME=os.getenv("KEYCLOAK_ADMIN_USERNAME")
KEYCLOAK_ADMIN_PASSWORD=os.getenv("KEYCLOAK_ADMIN_PASSWORD")

APP_USER_BASE_URL = os.getenv("APP_USER_BASE_URL")
APP_USER_ROLES = os.getenv("APP_USER_ROLES")
APP_REALM = os.getenv("APP_REALM")
APP_SECRET_KEY = os.getenv("APP_SECRET_KEY")
APP_CLIENT_SECRET = os.getenv("APP_CLIENT_SECRET")
APP_CLIENT_ID = os.getenv("APP_CLIENT_ID")
BASE_URL = os.getenv("BASE_URL")
REST_REDIRECT_URI = os.getenv("REST_REDIRECT_URI")