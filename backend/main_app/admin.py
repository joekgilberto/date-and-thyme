from django.contrib import admin
# Imports models
from .models import FoodItem, Notification

# Adds FoodItem model attributes to be accessed in admin portal
class FoodItemAdmin(admin.ModelAdmin):
	list_display = ("name","purchase_date","expiration_date","quantity","notification")

# Adds Notification model attributes to be accessed in admin portal
class NotificationAdmin(admin.ModelAdmin):
	list_display = ("days_left","read","generation_date")

# Registers admin classes
admin.site.register(FoodItem,FoodItemAdmin)
admin.site.register(Notification,NotificationAdmin)
