# Generated by Django 4.2.5 on 2023-09-25 16:15

import datetime
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='FoodItem',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=35)),
                ('purchase_date', models.DateField(default=datetime.date.today)),
                ('expiration_date', models.DateField()),
                ('quantity', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='Notification',
            fields=[
                ('food_item', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to='main_app.fooditem')),
                ('days_left', models.IntegerField(null=True)),
                ('read', models.BooleanField(default=False)),
                ('generation_date', models.DateField(default=datetime.date.today)),
            ],
        ),
    ]
