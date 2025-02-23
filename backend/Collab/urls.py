from django.urls import path
from django.contrib import admin

from backend.Collab import views

urlpatterns = [
   path('username', views.return_username, name='return_username'),
    path('login', views.validate_login, name='validate_login'),
    path('register', views.register, name='register'),
    path('logout', views.logout, name='logout'),
    path('user_data', views.get_user_data, name='get_user_data'),
    path('profilePicture', views.upload_profile_picture, name='upload_profile_picture'),
    path('bannerPicture', views.upload_banner_picture, name='upload_banner_picture'),
    path('description', views.update_description, name='update_description'),
]