# Generated by Django 5.1.3 on 2024-12-12 14:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Web', '0032_orderitem_rating'),
    ]

    operations = [
        migrations.AlterField(
            model_name='orderitem',
            name='rating',
            field=models.PositiveIntegerField(blank=True, choices=[(1, '1'), (2, '2'), (3, '3'), (4, '4'), (5, '5')], null=True),
        ),
    ]
