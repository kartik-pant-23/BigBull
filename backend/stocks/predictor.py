import numpy as np
import matplotlib.pyplot as plt
import pandas as pd
import yfinance as yf
from sklearn.preprocessing import MinMaxScaler

from tensorflow.python.keras.layers import LSTM
from tensorflow.python.keras.layers import Dropout
from tensorflow.python.keras import Sequential
from tensorflow.python.keras.layers import Conv2D, Flatten, Dense


def load_data(symbol):
    sym=symbol+'.NS'
    train_df = yf.download(sym, 
                      start='2017-03-28', 
                      end='2022-03-28', 
                      progress=False,)

    train_df=train_df.iloc[::-1]
    train_df.reset_index(inplace=True)
    return train_df

def testing_data(symbol):
    sym=symbol+'.NS'
    test_df=yf.download(sym, 
                start='2022-03-28', 
                end='2022-04-24', 
                progress=False,)
    return test_df

def predict(symbol):
    train_df=load_data(symbol)
    training_set = train_df.iloc[:, 2:3].values
    sc = MinMaxScaler(feature_range=(0,1))
    training_set_scaled = sc.fit_transform(training_set)
    X_train = []
    y_train = []
    x_len=len(training_set)
    for i in range(60,x_len):
        X_train.append(training_set_scaled[i-60:i, 0])
        y_train.append(training_set_scaled[i, 0])
    X_train, y_train = np.array(X_train), np.array(y_train)
    X_train = np.reshape(X_train, (X_train.shape[0], X_train.shape[1], 1))
    model = Sequential()

    model.add(LSTM(units=50,return_sequences=True,input_shape=(X_train.shape[1], 1)))
    model.add(Dropout(0.2))

    model.add(LSTM(units=50,return_sequences=True))
    model.add(Dropout(0.2))

    model.add(LSTM(units=50,return_sequences=True))
    model.add(Dropout(0.2))

    model.add(LSTM(units=50))
    model.add(Dropout(0.2))

    model.add(Dense(units=1))

    model.compile(optimizer='adam',loss='mean_squared_error')

    model.fit(X_train,y_train,epochs=50,batch_size=32)
    
    dataset_test = testing_data(symbol)
    real_stock_price = dataset_test.iloc[:, 1:2].values
    data = load_data(symbol)
    data=data.iloc[::-1]
    data.reset_index(inplace=True)
    dataset_total = pd.concat((data['Open'], dataset_test['Open']), axis = 0)
    inputs = dataset_total[len(dataset_total) - len(dataset_test) - 60:].values
    inputs = inputs.reshape(-1,1)
    inputs = sc.transform(inputs)
    X_test = []
    for i in range(60,78):
        X_test.append(inputs[i-60:i, 0])
    X_test = np.array(X_test)
    X_test = np.reshape(X_test, (X_test.shape[0], X_test.shape[1], 1))
    predicted_stock_price = model.predict(X_test)
    predicted_stock_price = sc.inverse_transform(predicted_stock_price)

    x=dataset_test.index
    z=list(x)
    # print(z)
    x_len=range(len(z))
    dates=[]
    for i in x_len:
        dates.append(str(x[i]).replace('[',"").replace(']',"").replace("'",""))

    return predicted_stock_price,real_stock_price,dates