from django.contrib import admin
from .models import Product
# Register your models here.
@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'price', 'seller', 'is_sold', 'created_at')
    list_filter = ('category', 'condition', 'is_sold')
    search_fields = ('title', 'description')