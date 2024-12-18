from django.urls import path
from .views import *

urlpatterns = [
    path('posts/', post_list_create, name='post-list-create'),
    path('posts/<int:pk>/', post_detail, name='post-detail'),
    path('posts/<int:pk>/like/', like_post, name='post-like'),
    path('posts/<int:post_id>/comments/', comment_list_create, name='comment-list-create'),
    path('comments/<int:pk>/', comment_detail, name='comment-detail'),
    path('my-posts/', my_posts, name='my-posts'),
    path('my_comments/', my_comments, name = 'my_comments'),
]
