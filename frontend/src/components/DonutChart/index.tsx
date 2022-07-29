import axios from "axios";
import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { SaleSum } from "../../types/sale";
import { BASE_URL } from "../../utils/requests";


type ChartData = {
    labels: string[];
    series: number[];
}

export default function DonutChart() {

    const [chartData, setChartData] = useState<ChartData>({ labels: [], series: [] });


    useEffect(() => {
        axios.get(`${BASE_URL}/sales/amount-by-seller`)
            .then((res) => {
                const data = res.data as SaleSum[];
                const myLabels = data.map(x => x.sellerName);
                const mySeries = data.map(x => x.sum);


                setChartData({ labels: myLabels, series: mySeries });
                console.log(res.data);
            })
    }, [])


    const options = {
        legend: {
            show: true
        }
    }


    return (
        <ReactApexChart
            options={{ ...options, labels: chartData.labels }}
            series={chartData.series}
            type="donut"
            height="240"

        />
    )
}
