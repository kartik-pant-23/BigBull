# BigBull

This application provides a way for paper trading to new traders, which allows them to buy/sell stocks with virtual money that is provided by the application. 

The app makes use of `ApexCharts` to represent data in candle-stick graph, which provides enormous capabilities for visualizing the data. 
It does not use any paid APIs to fetch stock details, instead the data is fetched using web scraping from [Google Finance](https://www.google.com/finance/).

`React.js` is used in the frontend, while `Django` is used for the backend. `Postgresql` is the relational database that is used to store the application's data.

For predicting the stock price, `LSTM(Long-Short Term Memory)` model is used that provided an accuracy of **60%** during testing.


## Features

1. **Trading** - The application provides virtual currency inside the app, which a user can use to buy the stocks at their current market price. 
Users start with an initial amount `100000` which can be refilled any time. Bought stocks are added to user's `portfolio`.
To study the market better, it provides graphical representation of yearly stock price data. User's can play around with candle-stick graph to get 
more information from it. And can even download the data as `SVG, CSV, PNG`.
2. **Wishlist** - User can watch the details of the stock and then can add it to his wishlist, which allows faster accessibility.
3. **Price Prediction** - This is where the real action takes place, stock-price prediction. User gets a detailed graph which shows the actual price and predicted prices, 
that let's user understand, the predicted behaviour of particlar stock.


### Screenshots

#### Landing Screen
![landing_screen](https://user-images.githubusercontent.com/63868389/170997515-c6a9d998-f362-47fb-833c-3fcd6d2dd166.png)

#### Home Screen
![home_screen](https://user-images.githubusercontent.com/63868389/170997615-de89c016-b6fa-464d-be0a-89eadd47ae91.png)

#### Stock Details
![candleSticksGraph](https://user-images.githubusercontent.com/63868389/170997670-fe7a78e5-13c9-44d1-a2f5-acaabe96438e.png)

#### Price Prediction Graph
![predictionGraph](https://user-images.githubusercontent.com/63868389/170997700-218fd756-31d1-43ac-9d2d-6b2e0449a5b4.png)
