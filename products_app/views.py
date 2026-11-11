from django.shortcuts import render, get_object_or_404
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
