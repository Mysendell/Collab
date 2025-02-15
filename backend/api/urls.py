from django.urls import path

from backend.api import views

urlpatterns = [
    path("username", views.return_username, name="username"),
]