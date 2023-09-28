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
from django.contrib import admin

# add include to the path
from django.urls import path, include
from rest_framework.authtoken.views import obtain_auth_token  # <-- Here
from rest_framework.urlpatterns import format_suffix_patterns

# import views from todo
from main_app import views

# import routers from the REST framework
# it is necessary for routing
from rest_framework import routers

# create a router object
router = routers.DefaultRouter()

urlpatterns = [
	path('admin/', admin.site.urls),

	# add another path to the url patterns
	# when you visit the localhost:8000/api
	# you should be routed to the django Rest framework
	path('api/', include(router.urls)),
    path('food-items/', views.FoodItemList.as_view()),
    path('food-items/<int:pk>/', views.FoodItemDetail.as_view()),
    path('notifications/', views.NotificationList.as_view()),
    path('notifications/<int:pk>/', views.NotificationDetail.as_view()),
    path('user/', views.CreateUser.as_view()),
    path('query/', views.NotificationQueryView.as_view(), name="notifications"),
    path('api-token-auth/', obtain_auth_token, name='api_token_auth'),  # <-- And here

]

