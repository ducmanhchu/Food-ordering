# Generated by Django 5.1.3 on 2024-12-11 09:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Web', '0028_delete_user_children'),
    ]

    operations = [
        migrations.AlterField(
            model_name='paymentmethod',
            name='QRcode',
            field=models.FileField(blank=True, null=True, upload_to=''),
        ),
    ]