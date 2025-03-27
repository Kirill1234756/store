from django.contrib import admin
from .models import Product, User


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('title', 'condition', 'price', 'seller')
    list_filter = ('condition', 'storage')
    search_fields = ('title', 'description')


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('username', 'email', 'phone')
    search_fields = ('username', 'email', 'phone')
