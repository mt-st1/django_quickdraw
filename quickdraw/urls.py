from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.root, name='quickdraw-root'),
    url(r'^predict_drawing$', views.predict_drawing, name='predict_drawing'),
    url(r'^(?:.*)/?$', views.root, name='other-page'),
]
