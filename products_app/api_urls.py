from django.urls import path
from . import api_views

urlpatterns = [
    path('', api_views.ProductListCreateView.as_view(), name='api_product_list'),
    path('<int:pk>/', api_views.ProductDetailView.as_view(), name='api_product_detail'),
]