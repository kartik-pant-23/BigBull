from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.registerUser),
    path('login/', views.loginUser),
    path('user/<int:user_id>/', views.getUserDetails),
    path('add_to_wishlist/', views.addToWishlist),
    path('reset_balance/<int:user_id>/', views.resetBalance)
]