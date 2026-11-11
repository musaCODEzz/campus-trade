from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class Product(models.Model):
    # Predefined categories for campus students
    CATEGORY_CHOICES = [
        ('textbooks', '📚 Textbooks & Notes'),
        ('electronics', '💻 Laptops & Electronics'),
        ('hostel', '🛋️ Hostel & Furnishings'),
        ('appliances', '🍳 Kitchen & Appliances'),
        ('fashion', '👟 Fashion & Wearables'),
        ('other', '📦 Other Items'),
    ]
    CONDITION_CHOICES = [
        ('brand_new', 'Brand New'),
        ('like_new', 'Like New / Barely Used'),
        ('fair', 'Good / Fair Condition'),
    ]
    title = models.CharField(max_length=200)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, default='other')
    condition = models.CharField(max_length=20, choices=CONDITION_CHOICES, default='like_new')
    seller = models.ForeignKey(User, on_delete=models.CASCADE, related_name='products')
    is_sold = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return f"{self.title} — Ksh {self.price}"