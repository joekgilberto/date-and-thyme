# Generated by Django 4.2.5 on 2023-09-28 01:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main_app', '0007_remove_fooditem_owner'),
    ]

    operations = [
        migrations.AddField(
            model_name='fooditem',
            name='owner',
            field=models.CharField(default=1),
            preserve_default=False,
        ),
    ]
