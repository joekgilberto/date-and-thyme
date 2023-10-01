# Imports serializers
from rest_framework import serializers
# Imports FoodItem and Noticiation models
from .models import FoodItem, Notification
# Imports User model
from django.contrib.auth.models import User

# Accesses pk, username, and password from User model
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('pk','username','password')

# Accesses pk, name, purchase_date, expiration_date, quantity, and owner from FoodItem model
class FoodItemSerializer(serializers.ModelSerializer):
	class Meta:
		model = FoodItem
		fields = ('pk','name','purchase_date','expiration_date','quantity','owner')
		
# Accesses food_item, food_item_name, days_left, read, generation_date, and owner from Notification model
class NotificationSerializer(serializers.ModelSerializer):
	class Meta:
		model = Notification
		fields = ('food_item','food_item_name','days_left','read','generation_date','owner')
