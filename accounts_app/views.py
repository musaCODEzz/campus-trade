from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout


def register(request):
    error_message = None

    # If the user clicked the "Register" button (submitted the form)
    if request.method == 'POST':
        # Grab the data from the HTML inputs using their 'name' attribute
        uname = request.POST.get('username')
        uemail = request.POST.get('email')
        upass = request.POST.get('password')

        # Check if username is already taken
        if User.objects.filter(username=uname).exists():
            error_message = "That username is already taken. Please pick another one."
        else:
            # Save the new user into the database
            User.objects.create_user(username=uname, email=uemail, password=upass)
            # Send them to the login page after registering
            return redirect('login')

    # If they are just visiting the page or there was an error, show the HTML form
    return render(request, 'accounts/register.html', {'error': error_message})


def user_login(request):
    error_message = None

    if request.method == 'POST':
        # 1. Grab what they typed in the HTML inputs
        uname = request.POST.get('username')
        upass = request.POST.get('password')

        # 2. Check if a user with this username and password exists in the database
        user = authenticate(request, username=uname, password=upass)

        # 3. If the details are correct (user is not None), log them in!
        if user is not None:
            login(request, user)
            return redirect('home')  # Takes you to the homepage
        else:
            # If wrong username or password, save error message
            error_message = "Invalid username or password. Please try again."

    # Show the login.html form with the error message if login failed
    return render(request, 'accounts/login.html', {'error': error_message})


def user_logout(request):
    logout(request)
    return redirect('home')
