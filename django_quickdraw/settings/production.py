from .base import *

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False

if not DEBUG:
    import django_heroku
    django_heroku.settings(locals())
