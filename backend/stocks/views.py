from .serializers import StockSerializer, CompanySerializer
from users.models import User
from .models import Stock, Company
import requests
import pandas as pd
import yfinance as yf
from bs4 import BeautifulSoup
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db.models import Q
from .predictor import predict
import datetime

def scrapeStockDetails(symbol):
    URL = "https://www.google.com/finance/quote/{}:NSE".format(symbol)
    r = requests.get(URL)
    soup = BeautifulSoup(r.content, 'html5lib') 
    
    details = {}
    details["Company Name"] = soup.find('div',{'class':'zzDege'}).text
    details["Current Price"] = soup.find('div',{'class':'YMlKec fxKbKc'}).text.replace("â‚¹", u'\u20B9')
    
    key_val=soup.find_all('div',{'class':'mfs7Fc'})
    val = soup.find_all('div',{'class':'P6K39c'})

    for i in range(len(key_val)):
        this_val = val[i].text
        this_val = this_val.replace("â‚¹", u'\u20B9')
        details[key_val[i].text] = this_val

    return details
@api_view(['GET'])
def getStockDetails(request, symbol):
    return Response(scrapeStockDetails(symbol))

def scrapeOHLCData(symbol):
    df = yf.download("{}.NS".format(symbol), 
        period="1y",
        interval="1h",
        progress=False,
    )
    df=df.drop(['Adj Close','Volume'],axis=1)
    df = df.to_dict('index')
    data = {}
    for key in df.keys():
        data[key.timestamp() * 1000] = df[key]
    return data
@api_view(['GET'])
def getStockOHLCDetails(request, symbol):
    return Response(scrapeOHLCData(symbol))

@api_view(['GET'])
def searchStock(request):
    symbol = request.GET.get('q', '')
    companies = Company.objects.filter(Q(symbol__contains=symbol) | Q(company_name__contains=symbol))[:10]
    return Response({
        "companies": CompanySerializer(companies, many=True).data
    })

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

@api_view(['GET'])
def getStockPrediction(request, symbol):
    [predicted_price, real_price, dates] = predict(symbol)
    predicted_price = predicted_price.tolist()
    real_price = real_price.tolist()
    return Response({
        "predicted_price": predicted_price,
        "real_price": real_price,
        "dates": dates
    })