from rest_framework import serializers
from .models import FoodItem, Notification
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username','password')

class FoodItemSerializer(serializers.ModelSerializer):
	class Meta:
		model = FoodItem
		fields = ('pk','name','purchase_date','expiration_date','quantity','owner')
		
class NotificationSerializer(serializers.ModelSerializer):
	class Meta:
		model = Notification
		fields = ('food_item','food_item_name','days_left','read','generation_date','owner')
