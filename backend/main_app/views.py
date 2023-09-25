from django.shortcuts import render

# import view sets from the REST framework
from rest_framework import viewsets, generics

# import the FoodItemSerializer,NotificationSerializer from the serializer file
from .serializers import FoodItemSerializer,NotificationSerializer

# import the FoodItem,Notification model from the models file
from .models import FoodItem,Notification

# create a class for the FoodItem model viewsets
class FoodItemView(viewsets.ModelViewSet):

	# create a serializer class and
	# assign it to the FoodItemSerializer class
	serializer_class = FoodItemSerializer

	# define a variable and populate it
	# with the FoodItem list objects
	queryset = FoodItem.objects.all()

# class NotificationView(viewsets.ModelViewSet):

# 	# create a serializer class and
# 	# assign it to the NotificationsSerializer class
# 	serializer_class = NotificationSerializer

# 	# define a variable and populate it
# 	# with the Notification list objects
# 	queryset = Notification.objects.all()

class NotificationView(generics.ListAPIView):
    serializer_class = NotificationSerializer

    def get_queryset(self):
        """
        Optionally restricts the returned purchases to a given user,
        by filtering against a `username` query parameter in the URL.
        """
        queryset = Notification.objects.all()
        food = self.request.query_params.get('food')
        if food is not None:
            queryset = queryset.filter(food_item=food)
        return queryset