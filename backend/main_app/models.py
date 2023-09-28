from django.db import models
from datetime import date
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)


# Create your models here.
class FoodItem(models.Model):
    name = models.CharField(max_length=35)
    purchase_date = models.DateField(default=date.today)
    expiration_date = models.DateField()
    quantity = models.IntegerField()
    owner = models.CharField()

    def __str__(self):
        return self.name


class Notification(models.Model):
    food_item = models.OneToOneField(
        FoodItem,
        on_delete=models.CASCADE,
        primary_key=True,
    )
    food_item_name = models.CharField(null=True)
    days_left = models.IntegerField(null=True)
    read = models.BooleanField(default=False)
    generation_date = models.DateField(default=date.today)
    owner = models.CharField()

    def __str__(self):
        if self.days_left == 1:
            return f"{self.food_item.name} has {self.days_left} day left."
        else:
            return f"{self.food_item.name} has {self.days_left} days left."
