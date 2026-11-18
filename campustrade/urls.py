from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('core_app.urls')),
    path('accounts/', include('accounts_app.urls')),
    path('products/', include('products_app.urls')),
    path('api/products/', include('products_app.api_urls')), 
    path('api/auth/', include('accounts_app.api_urls')), 
    path('api-auth/', include('rest_framework.urls')),
]
