from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.decorators import login_required
from .models import Product


def product_list(request):
    """
    Shows all available campus products.
    Supports filtering by category and searching by keyword.
    """
    # 1. Start with all unsold products, newest first
    products = Product.objects.filter(is_sold=False).order_by('-created_at')

    # 2. Check if user clicked a category filter (?category=textbooks)
    category = request.GET.get('category')
    if category:
        products = products.filter(category=category)

    # 3. Check if user typed something in the search bar (?q=kettle)
    query = request.GET.get('q')
    if query:
        products = products.filter(title__icontains=query)

    # 4. Pass the categories so the template can render filter pills
    categories = Product.CATEGORY_CHOICES

    context = {
        'products': products,
        'categories': categories,
        'selected_category': category,
        'search_query': query,
    }
    return render(request, 'products/product_list.html', context)


def product_detail(request, pk):
    """
    Shows details for a single product (by ID / primary key).
    """
    product = get_object_or_404(Product, pk=pk)
    return render(request, 'products/product_detail.html', {'product': product})

@login_required(login_url='login')
def add_product(request):
    """
    Lets a logged-in student post a new item to the marketplace.
    GET  → show the empty form
    POST → save the new product to the database
    """
    error = None

    if request.method == 'POST':
        # Pull each field from the submitted form
        title       = request.POST.get('title')
        description = request.POST.get('description')
        price       = request.POST.get('price')
        category    = request.POST.get('category')
        condition   = request.POST.get('condition')

        # Basic validation — title and price are the must-haves
        if not title or not price:
            error = "Title and Price are required fields."
        else:
            # Save to database — seller is automatically the logged-in user
            Product.objects.create(
                title=title,
                description=description,
                price=price,
                category=category,
                condition=condition,
                seller=request.user
            )
            # Redirect to the marketplace so they can see their new item
            return redirect('product_list')

    # For GET requests (or POST with errors), show the form
    categories = Product.CATEGORY_CHOICES
    conditions = Product.CONDITION_CHOICES

    return render(request, 'products/add_product.html', {
        'categories': categories,
        'conditions': conditions,
        'error': error,
    })