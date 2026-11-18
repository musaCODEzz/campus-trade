from rest_framework import generics, permissions
from rest_framework.response import Response
from django.contrib.auth.models import User
from .serializers import RegisterSerializer, UserSerializer


class RegisterAPIView(generics.CreateAPIView):
    """
    POST /api/auth/register/
    Accepts: { "username": "...", "email": "...", "password": "..." }
    Creates the user and returns the new user data.
    """
    queryset = User.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = RegisterSerializer


class CurrentUserAPIView(generics.RetrieveAPIView):
    """
    GET /api/auth/user/
    Protected endpoint: returns profile info for the user whose token is attached.
    """
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        # request.user is set automatically by SimpleJWT from the token!
        return self.request.user
