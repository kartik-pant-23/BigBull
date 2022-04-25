import { dividerClasses } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import * as ReactDOM from 'react-dom'
import ReactApexChart from 'react-apexcharts'
import Loading from '../Loading'

const PredictGraph = () => {
    let { symbol } = useParams()
    let [data, setData] = useState([])
    let [min_val, setMin_val] = useState(0)
    let [max_val, setMax_val] = useState(0)
    let [loading, setLoading] = useState(true)
    useEffect(() => {
        symbol && fetch(
            `http://127.0.0.1:3001/api/stocks/predict/${symbol}/`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        ).then(
            async (res) => {
                let this_data = await res.json()
                let data = {
                    "dates": this_data.dates,
                    "predicted_price": [],
                    "real_price": []
                }
                let min_val = 1000000
                let max_val = 0
                this_data.predicted_price.forEach(price => {
                    data["predicted_price"].push(price[0])
                    min_val = Math.min(min_val, parseFloat(price[0])).toFixed(2)
                    max_val = Math.max(max_val, parseFloat(price[0])).toFixed(2)
                })
                this_data.real_price.forEach(price => {
                    data["real_price"].push(price[0])
                    min_val = Math.min(min_val, parseFloat(price[0])).toFixed(2)
                    max_val = Math.max(max_val, parseFloat(price[0])).toFixed(2)
                })
                setData(data)
                setLoading(false)
                setMin_val(min_val)
                setMax_val(max_val)
                console.log(data);
            }
        ).catch((error)=> {
            setLoading(false)
            console.log(error)
        })
    }, [])

    let series = [{
        name: "Predicted Price",
        data: data["predicted_price"]
    }, {
        name: "Real Price",
        data: data["real_price"]
    }]

    let options = {
        chart: {
            height: 750,
            type: "line",
            stacked: false
        },
        dataLabels: {
            enabled: false
        },
        colors: ["#FF1654", "#247BA0"],
        series: [
            {
                name: "Predicted Price",
                data: data["predicted_price"]
            },
            {
                name: "Real Price",
                data: data["real_price"]
            }
        ],
        stroke: {
            width: [4, 4]
        },
        plotOptions: {
            bar: {
                columnWidth: "20%"
            }
        },
        xaxis: {
            categories: data["dates"]
        },
        yaxis: [
            {
                min: Math.max(0.00, min_val - 10.00),
                max: max_val + 10.00,
                axisBorder: {
                    show: true,
                    color: "#FF1654"
                },
                labels: {
                    style: {
                        colors: "#FF1654"
                    }
                },
                title: {
                    text: "Predicted Price",
                    style: {
                        color: "#FF1654"
                    }
                },
                tickAmount: 15
            },
            {
                min: Math.max(0.00, min_val - 10.00),
                max: max_val + 10.00,
                opposite: true,
                axisBorder: {
                    show: true,
                    color: "#247BA0"
                },
                labels: {
                    style: {
                        colors: "#247BA0"
                    }
                },
                title: {
                    text: "Real Price",
                    style: {
                        color: "#247BA0"
                    }
                },
                tickAmount: 15
            }
        ],
        tooltip: {
            shared: false,
            intersect: true,
            x: {
                show: false
            }
        },
        legend: {
            horizontalAlign: "left",
            offsetX: 40
        }
    };

    return (
        loading
        ? <div>
            <h3 style={{ "textAlign": "center", "margin": "20px auto"}}>This might take a bit long.</h3>
            <Loading />
        </div>
        : <div id="chart" style={{width: "80%", margin: "20px auto", textAlign: "center"}}>
            <h3>Price prediction for {symbol}</h3>
            <ReactApexChart
                options={options}
                series={series}
                type={"line"}
                height={750}
            />
        </div>
    )
}

export default PredictGraph

const domContainer = document.getElementById('root')
ReactDOM.render(React.createElement(PredictGraph), domContainer)