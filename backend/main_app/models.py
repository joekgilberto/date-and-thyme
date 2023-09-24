from django.db import models
from datetime import date

# Create your models here.
class FoodItem(models.Model):
  name = models.CharField(max_length=35)
  purchase_date = models.DateField(default=date.today)
  expiration_date = models.DateField()
  quantity = models.IntegerField()

  def __str__(self):
    return self.name

class Notification(models.Model):
  food_item = models.OneToOneField(
        FoodItem,
        on_delete=models.CASCADE,
        primary_key=True,
    )
  days_left = models.IntegerField()
  read = models.BooleanField()
  generation_date = models.DateField(default=date.today)

  def __str__(self):
    if self.days_left == 1:
        return f"{self.food_item.name} has {self.days_left} day left."
    else:
        return f"{self.food_item.name} has {self.days_left} days left."

