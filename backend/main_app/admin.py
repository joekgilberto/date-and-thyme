from django.contrib import admin
from .models import FoodItem, Notification

class FoodItemAdmin(admin.ModelAdmin):
	list_display = ("name","purchase_date","expiration_date","quantity","notification")
	
class NotificationAdmin(admin.ModelAdmin):
	list_display = ("days_left","read","generation_date")

admin.site.register(FoodItem,FoodItemAdmin)
admin.site.register(Notification,NotificationAdmin)
