from .serializers import StockSerializer
from users.models import User
from .models import Stock
import requests
from bs4 import BeautifulSoup
from rest_framework.decorators import api_view
from rest_framework.response import Response

def scrapeStockDetails(symbol):
    URL = "https://www.google.com/finance/quote/{}:NSE".format(symbol)
    r = requests.get(URL)
    soup = BeautifulSoup(r.content, 'html5lib') 
    price = soup.find('div',{'class':'YMlKec fxKbKc'}).text 
    return {
        "symbol": symbol,
        "price": price[3:]
    }

@api_view(['GET'])
def getStockDetails(request, symbol):
    # this should be able to return OHLC data for the stock
    # so that the graph can be prepared
    return Response(scrapeStockDetails(symbol))

@api_view(['POST'])
def buyStocks(request):
    data = request.data

    # check if you user exists
    user = User.objects.filter(id=data['user_id']).first()
    if (user):
        stock_cost = data['quantity'] * data['price']

        # check if user has enough balance
        if stock_cost <= user.account_balance:
            stock = Stock.objects.filter(user_id=user.id, symbol=data['symbol']).first()
            if stock is None:
                stock = Stock.objects.create(
                    symbol=data['symbol'],
                    company_name=data['company_name'],
                    user_id=user
                )
            new_quantity = stock.quantity + data['quantity']
            new_avg_value = (stock.avg_value * stock.quantity + stock_cost) / new_quantity

            # update the stock with new values
            stock.avg_value = new_avg_value
            stock.quantity = new_quantity
            stock.save()

            # update user with new account balance
            user.account_balance -= stock_cost
            user.save()

            return Response({
                "message": "buy stock successful!",
                "details": StockSerializer(stock).data
            })
        return Response({ "message": "Balance low" }, status=403)
    return Response({ "message": "User does not exist!" }, status=404)

@api_view(['POST'])
def sellStocks(request):
    data = request.data

    # check if you user exists
    user = User.objects.filter(id=data['user_id']).first()
    if (user):

        # check if user has enough stocks
        stock = Stock.objects.filter(user_id=user.id, symbol=data['symbol']).first()
        if (stock):
            if data['quantity'] <= stock.quantity:
                stock_value = data['quantity'] * data['price']
                profit_earned = stock_value - stock.avg_value * data['quantity']

                # updating the stock
                stock.quantity -= data['quantity']
                stock_data = StockSerializer(stock).data
                if stock.quantity == 0:
                    stock.delete()
                else:
                    stock.save()

                # updating user
                user.account_balance += stock_value
                user.save()

                return Response({
                    "message": "sell stock successful",
                    "profit_earned": profit_earned, 
                    "user_account_balance": user.account_balance,
                    "updated_stock_detail": stock_data
                })
        return Response({ "message": "Don't have enough stocks of the company!" }, status=403)
    return Response({ "message": "User does not exist!" }, status=404)