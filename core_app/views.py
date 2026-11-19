from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from .models import ContactMessage

# Create your views here.
def home(request):
    return render(request, 'core/index.html')

def about(request):
    return render(request, 'core/about.html')

def contact(request):
    success = False
    # Did the user click the "Send Message" button?
    if request.method == 'POST':
        c_name = request.POST.get('name')
        c_email = request.POST.get('email')
        c_message = request.POST.get('message')
        # Save into the database!
        ContactMessage.objects.create(
            name=c_name,
            email=c_email,
            message=c_message
        )
        success = True  # Tell the template that it was saved successfully
    return render(request, 'core/contact.html', {'success': success})


# ─── DRF REST API View for React Frontend ───
@api_view(['POST'])
@permission_classes([AllowAny])
def api_contact(request):
    name = request.data.get('name')
    email = request.data.get('email')
    message = request.data.get('message')

    if not name or not email or not message:
        return Response(
            {'error': 'All fields (name, email, message) are required.'},
            status=status.HTTP_400_BAD_REQUEST
        )

    ContactMessage.objects.create(
        name=name,
        email=email,
        message=message
    )

    return Response(
        {'message': 'Thank you! Your message has been sent to our campus team.'},
        status=status.HTTP_201_CREATED
    )
