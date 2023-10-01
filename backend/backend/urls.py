"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path
from django.contrib import admin
# Imports custom views
from main_app import views
# Imports authtoken views from rest_framework
from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
    path('',views.home, name="home"),
    # Sets up url path to admin permissions
	path('admin/', admin.site.urls),

    # Sets up url path to get all or create food items
    path('food-items/', views.FoodItemList.as_view()),

    # Sets up url path to get, edit, or delete speicifc food item
    path('food-items/<int:pk>/', views.FoodItemDetail.as_view()),

    # Sets up url path to get all or create notifications
    path('notifications/', views.NotificationList.as_view()),

    # Sets up url path to get, edit, or delete speicifc notification
    path('notifications/<int:pk>/', views.NotificationDetail.as_view()),

    # Sets up url path to create users
    path('user/', views.CreateUser.as_view()),

    # Sets up url path to gain auth token
    path('api-token-auth/', obtain_auth_token, name='api_token_auth')
]

