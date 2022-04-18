from django.urls import path
from . import views

urlpatterns = [
    path('', views.index),
    path('login', views.index),
    path('register', views.index),
    path('dashboard', views.index),
]
