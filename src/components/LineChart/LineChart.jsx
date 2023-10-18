// import PropTypes from "prop-types";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

import * as St from "./LineChart.styled";

ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Title,
    Tooltip,
    Legend
);

const LineChart = () => {
    const data = {
        labels: ["Sep", "Oct", "Nov", "Dec"],
        datasets: [
            {
                label: "Fall",
                data: [2, 8, 3, 9],
                // backgroundColor: "transparent",
                backgroundColor: "rgb(75, 192, 192)",
                borderColor: "rgb(75, 192, 192)",
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
        <St.CardStyled hoverable loading={false}>
            <Line className="chart" data={data} options={option} />
        </St.CardStyled>
    );
};

LineChart.propTypes = {};

export default LineChart;
