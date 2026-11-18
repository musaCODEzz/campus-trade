from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from . import api_views

urlpatterns = [
    # 1. Register a new user
    path('register/', api_views.RegisterAPIView.as_view(), name='api_register'),

    # 2. Login (Send username + password → Receive access + refresh tokens)
    path('login/', TokenObtainPairView.as_view(), name='api_login'),

    # 3. Refresh expired access token using refresh token
    path('token/refresh/', TokenRefreshView.as_view(), name='api_token_refresh'),

    # 4. Check who is logged in currently
    path('user/', api_views.CurrentUserAPIView.as_view(), name='api_current_user'),
]
