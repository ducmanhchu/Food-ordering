from django.urls import path
from Web.views import *

urlpatterns = [
    path('login/', login, name='login'),
    path('register/', register, name='register'),
    path('products/', get_products, name='products'),
    path('categories/', get_categories, name='categories'),
    path('products/<int:pk>/', product_detail, name='product_detail'),

    path('categories/create/', create_category, name='create_category'),
    path('categories/<int:pk>/update/', update_category, name='update_category'),
    path('categories/<int:pk>/delete/', delete_category, name='delete_category'),
    path('orders/', customer_orders, name='oders'),
    path('orders/create/', create_order, name='create_order'),
    # path('categories/<int:pk>/update/', update_category, name='update_category'),
    # path('categories/<int:pk>/delete/', delete_category, name='delete_category'),
]
