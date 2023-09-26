# import serializers from the REST framework
from rest_framework import serializers

# import the todo data model
from .models import FoodItem, Notification

# create a serializer class
class FoodItemSerializer(serializers.ModelSerializer):

	# create a meta class
	class Meta:
		model = FoodItem
		fields = ('pk','name','purchase_date','expiration_date','quantity')
		
# create a serializer class
class NotificationSerializer(serializers.ModelSerializer):

	# create a meta class
	class Meta:
		model = Notification
		fields = ('food_item','days_left','read','generation_date')
