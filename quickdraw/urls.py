from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.root, name='quickdraw-root'),
    url(r'^(?:.*)/?$', views.root, name='other-page'),
]
