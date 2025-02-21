from django.urls import path
from django.contrib import admin

from backend.Collab import views

urlpatterns = [
   path('username', views.return_username, name='return_username'),
    path('login', views.validate_login, name='validate_login'),
    path('register', views.register, name='register'),
]