from django.contrib import admin

# import the model Todo
from .models import FoodItem, Notification

# create a class for the admin-model integration
class FoodItemAdmin(admin.ModelAdmin):

	# add the fields of the model here
	list_display = ("name","purchase_date","expiration_date","quantity")
	
class NotificationAdmin(admin.ModelAdmin):

	# add the fields of the model here
	list_display = ("food_item","days_left","read","generation_date")

# we will need to register the
# model class and the Admin model class
# using the register() method
# of admin.site class
admin.site.register(FoodItem,FoodItemAdmin)
admin.site.register(Notification,NotificationAdmin)
