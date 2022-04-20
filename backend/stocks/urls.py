from django.urls import path
from . import views

urlpatterns = [
    path('buy/', views.buyStocks),
    path('sell/', views.sellStocks),
    path('details/<str:symbol>/', views.getStockDetails),
    path('ohlc/<str:symbol>/', views.getStockOHLCDetails),
]