# Generated by Django 5.1.3 on 2024-12-06 10:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Web', '0010_alter_product_description_alter_product_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='category',
            name='name',
            field=models.CharField(max_length=200),
        ),
    ]
