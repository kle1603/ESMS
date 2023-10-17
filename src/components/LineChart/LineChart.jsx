// import PropTypes from "prop-types";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Title,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title);

const LineChart = () => {
    const data = {
        labels: [
            // "Jan",
            // "Feb",
            // "Mar",
            // "Apr",
            // "May",
            // "Jun",
            // "Jul",
            // "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ],
        datasets: [
            {
                data: [2, 8, 3, 9],
                backgroundColor: "transparent",
                borderColor: "#f26c6d",
                pointBorderColor: "transparent",
                pointBorderWidth: 4,
                tension: 0.3,
            },
        ],
    };

    const option = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: false,
            title: {
                display: true,
                text: "Performance Fall 2023",
                font: {
                    size: 16,
                    weight: "bold",
                },
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
            },
            y: {
                min: 0,
                max: 10,
                ticks: {
                    stepSize: 2,
                },
            },
        },
    };

    return (
        <div style={{ height: 300 }}>
            <Line width={"100%"} height={"100%"} data={data} options={option} />
        </div>
    );
};

LineChart.propTypes = {};

export default LineChart;
