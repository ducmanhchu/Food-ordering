from django.contrib import admin
from .models import Post, Comment
from typing import Any
from django.contrib import admin
from django.conf import settings


class PostAdmin(admin.ModelAdmin):
    change_list_template= 'Blog/post_changelist.html'
    list_display = ['title', 'author', 'created_at', 'updated_at']
    list_filter = ['author']
    def not_allow_edit(modeladmin, request, queryset):
        settings.ALLOW_EDIT_BY_ADMIN_ONLY = True
    def allow_edit(modeladmin, request, queryset):
        settings.ALLOW_EDIT_BY_ADMIN_ONLY = False
    not_allow_edit.short_description = "Not Allow Edit"
    allow_edit.short_description = 'Allow Edit'
    actions = [not_allow_edit, allow_edit]
    def get_action(self, action):
        return super().get_action(action)
    def get_list_editable(self, request):
        if settings.ALLOW_EDIT_BY_ADMIN_ONLY and not request.user.is_superuser:
            return None
        return super().get_list_editable(request)
    def save_model(self, request, obj, form, change):
        # Gán `author` là người dùng hiện tại
        if not obj.author:
            obj.author = request.user
        obj.save()
        
    # Để ẩn trường author trong form Admin
    def get_fields(self, request, obj=None):
        fields = super().get_fields(request, obj)
        if not obj:
            fields = [field for field in fields if field != 'author']  # Ẩn author khi tạo bài viết mới
        return fields

    def get_readonly_fields(self, request, obj=None):
        # readonly_fields = super().get_readonly_fields(request, obj)
        # if settings.ALLOW_EDIT_BY_ADMIN_ONLY and not request.user.is_superuser:
        #     return readonly_fields + [field.author for field in self.model._meta.fields]
        # return readonly_fields
        
        if request.user.is_staff or request.user.is_superuser:
            readonly_fields = list(super().get_readonly_fields(request, obj))
            return readonly_fields + ['author', 'liked_by']
        return super().get_readonly_fields(request, obj)
        
    def has_view_permission(self, request, obj=None):
        if request.user.is_staff:
            return True

    def has_add_permission(self, request):
        if request.user.is_staff or request.user.is_superuser:
            return True

    
    def has_change_permission(self, request, obj=None):
        # if request.user.is_superuser:
        #     return True
        if obj is not None and obj.author == request.user:
            return True
        return False

    def has_delete_permission(self, request, obj=None):
        if request.user.is_superuser:
            return True

    def has_module_permission(self, request):
        if request.user.is_staff:
            return True
admin.site.register(Post, PostAdmin)

class CommentAdmin(admin.ModelAdmin):
    list_display = ['post', 'author', 'content', 'created_at']
    
    def get_action(self, action):
        return super().get_action(action)

    def get_readonly_fields(self, request, obj=None):
        # readonly_fields = super().get_readonly_fields(request, obj)
        # if settings.ALLOW_EDIT_BY_ADMIN_ONLY and not request.user.is_superuser:
        #     return readonly_fields + [field.author for field in self.model._meta.fields]
        # return readonly_fields
        
        if request.user.is_staff or request.user.is_superuser:
            readonly_fields = list(super().get_readonly_fields(request, obj))
            return readonly_fields + ['author', 'content', 'post']
        return super().get_readonly_fields(request, obj)
        
    def has_view_permission(self, request, obj=None):
        if request.user.is_staff:
            return True

    def has_add_permission(self, request):
        if request.user.is_superuser:
            return True

    
    def has_change_permission(self, request, obj=None):
        # if request.user.is_superuser:
        #     return True
        if obj is not None and obj.author == request.user:
            return True
        return False

    def has_delete_permission(self, request, obj=None):
        if request.user.is_superuser:
            return True

    def has_module_permission(self, request):
        if request.user.is_staff:
            return True
admin.site.register(Comment, CommentAdmin)
