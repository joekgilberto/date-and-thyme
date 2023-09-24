from django.shortcuts import render

# import view sets from the REST framework
from rest_framework import viewsets

# import the TodoSerializer from the serializer file
from .serializers import FoodItemSerializer,NotificationSerializer

# import the Todo model from the models file
from .models import FoodItem,Notification

# create a class for the Todo model viewsets
class FoodItemView(viewsets.ModelViewSet):

	# create a serializer class and
	# assign it to the TodoSerializer class
	serializer_class = FoodItemSerializer

	# define a variable and populate it
	# with the Todo list objects
	queryset = FoodItem.objects.all()

class NotificationView(viewsets.ModelViewSet):

	# create a serializer class and
	# assign it to the TodoSerializer class
	serializer_class = NotificationSerializer

	# define a variable and populate it
	# with the Todo list objects
	queryset = Notification.objects.all()
