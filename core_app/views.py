from django.shortcuts import render
from .models import ContactMessage

# Create your views here.
def home(request):
    return render(request,'core/index.html')
def about(request):
    return render(request,'core/about.html')
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