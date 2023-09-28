# import serializers from the REST framework
from rest_framework import serializers

# import the todo data model
from .models import FoodItem, Notification
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('username','password')

# create a serializer class
class FoodItemSerializer(serializers.ModelSerializer):

	# create a meta class
	class Meta:
		model = FoodItem
		fields = ('pk','name','purchase_date','expiration_date','quantity','owner')
		
# create a serializer class
class NotificationSerializer(serializers.ModelSerializer):

	# create a meta class
	class Meta:
		model = Notification
		fields = ('food_item','food_item_name','days_left','read','generation_date')
