from django.urls import path

from frontend import views

urlpatterns = [
    path("username", views.return_username, name="username"),
    path("login", views.validate_login, name="login"),
    path("register", views.register, name="register"),
]