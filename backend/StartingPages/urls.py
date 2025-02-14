from django.urls import path

from backend.StartingPages import views

urlpatterns = [
    path('home/', views.index, name='index'),
    # path('about/', views.about, name='about'),
    # path('contact/', views.contact, name='contact'),
    # path('register/', views.register, name='register'),
    # path('login/', views.login, name='login'),
    # path('logout/', views.logout, name='logout'),
    # path('profile/', views.profile, name='profile'),
    # path('edit_profile/', views.edit_profile, name='edit_profile'),
    # path('change_password/', views.change_password, name='change_password'),
    # path('delete_account/', views.delete_account, name='delete_account')
]