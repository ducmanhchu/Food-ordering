# Generated by Django 5.1.3 on 2024-12-09 14:44

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Web', '0021_alter_order_employee'),
    ]

    operations = [
        migrations.RenameField(
            model_name='order',
            old_name='Payment Method',
            new_name='payment_method',
        ),
    ]
