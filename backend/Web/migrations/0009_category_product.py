# Generated by Django 5.1.3 on 2024-12-05 01:45

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Web', '0008_user_date_joined_alter_user_is_superuser'),
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(blank=True, max_length=200, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(blank=True, max_length=200, null=True)),
                ('image', models.URLField()),
                ('price', models.IntegerField()),
                ('description', models.TextField(blank=True)),
                ('status', models.CharField(choices=[('còn hàng', 'còn hàng'), ('tạm ngưng', 'tạm ngưng')], default='còn hàng', max_length=10)),
                ('rating', models.FloatField(blank=True, default=0.0, null=True)),
                ('sold', models.IntegerField(blank=True, default=10, null=True)),
                ('category', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='Web.category')),
            ],
        ),
    ]
