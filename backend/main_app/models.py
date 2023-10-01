# Imports models
from django.db import models
# Imports date
from datetime import date
# Imports settings
from django.conf import settings
# Imports post_save signal to edit user model after creation
from django.db.models.signals import post_save
# Imports receiver function to be called when a signal is sent
from django.dispatch import receiver
# Imports Token model
from rest_framework.authtoken.models import Token

# Automatically creates user token with each user creation
@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)

# Builts FoodItem model with name, purchase_date, expiration_date, quantity, and owner fields
class FoodItem(models.Model):
    name = models.CharField(max_length=35)
    purchase_date = models.DateField(default=date.today)
    expiration_date = models.DateField()
    quantity = models.IntegerField()
    owner = models.ForeignKey(Token, on_delete=models.CASCADE)


    def __str__(self):
        return self.name

# Builts Notification model with food_item, food_item_name, days_left, read, generation_date, and owner fields
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
    owner = models.ForeignKey(Token, on_delete=models.CASCADE)

    def __str__(self):
        if self.days_left == 1:
            return f"{self.food_item.name} has {self.days_left} day left."
        else:
            return f"{self.food_item.name} has {self.days_left} days left."
