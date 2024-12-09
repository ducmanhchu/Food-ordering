# Generated by Django 5.1.3 on 2024-12-07 06:46

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Web', '0015_alter_order_diachi_alter_order_email_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Cart',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('quantity', models.PositiveSmallIntegerField(default=0)),
                ('total_value', models.PositiveIntegerField(default=0)),
                ('customer', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='Web.customer')),
            ],
        ),
        migrations.CreateModel(
            name='CartItem',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('quantity', models.PositiveBigIntegerField(default=1)),
                ('cart', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Web.cart')),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Web.product')),
            ],
        ),
    ]
