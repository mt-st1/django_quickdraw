from .base import *

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False

if not DEBUG:
    SECRET_KEY = os.environ['SECRET_KEY']
    import django_heroku
    django_heroku.settings(locals())
