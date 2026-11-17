from rest_framework import generics, permissions
from .models import Product
from .serializers import ProductSerializer


class ProductListCreateView(generics.ListCreateAPIView):
    """
    GET  /api/products/ → List all unsold products (anyone can see)
    POST /api/products/ → Create a new product (must be logged in)
    """
    serializer_class = ProductSerializer

    def get_queryset(self):
        """Return unsold products, newest first."""
        queryset = Product.objects.filter(is_sold=False).order_by('-created_at')

        # Support filtering by category: /api/products/?category=textbooks
        category = self.request.query_params.get('category')
        if category:
            queryset = queryset.filter(category=category)

        # Support search: /api/products/?search=laptop
        search = self.request.query_params.get('search')
        if search:
            queryset = queryset.filter(title__icontains=search)

        return queryset

    def get_permissions(self):
        """Anyone can read (GET), only logged-in users can create (POST)."""
        if self.request.method == 'POST':
            return [permissions.IsAuthenticated()]
        return [permissions.AllowAny()]

    def perform_create(self, serializer):
        """When creating a product, automatically set seller to logged-in user."""
        serializer.save(seller=self.request.user)


class ProductDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    GET    /api/products/5/ → Get product #5 details
    PUT    /api/products/5/ → Update product #5 (owner only)
    DELETE /api/products/5/ → Delete product #5 (owner only)
    """
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    def get_permissions(self):
        """Anyone can read, only the seller can update or delete."""
        if self.request.method in ['PUT', 'PATCH', 'DELETE']:
            return [permissions.IsAuthenticated()]
        return [permissions.AllowAny()]