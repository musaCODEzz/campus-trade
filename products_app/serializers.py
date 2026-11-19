from rest_framework import serializers
from .models import Product


class ProductSerializer(serializers.ModelSerializer):
    """
    Translates Product model instances into JSON and back.
    ModelSerializer automatically creates fields based on the model.
    """
    # Show the seller's username instead of their ID number
    seller = serializers.ReadOnlyField(source='seller.username')
    # Also expose the seller's email so the buyer can contact them directly
    seller_email = serializers.ReadOnlyField(source='seller.email')

    class Meta:
        model = Product
        fields = [
            'id',
            'title',
            'description',
            'price',
            'category',
            'condition',
            'seller',
            'seller_email',
            'is_sold',
            'created_at',
        ]
        read_only_fields = ['id', 'seller', 'seller_email', 'is_sold', 'created_at']
