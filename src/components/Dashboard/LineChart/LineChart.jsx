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
import PropTypes from "prop-types";

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

const LineChart = ({ data, loading }) => {
    if (!Array.isArray(data)) {
        return null;
    }

    const datas = {
        // labels: ["Sep", "Oct", "Nov", "Dec"],
        labels: data.map((item) => item.day),
        datasets: [
            {
                label: "Value",
                data: data.map((item) => item.num),
                // backgroundColor: "transparent",
                backgroundColor: "rgb(75, 192, 192)",
                borderColor: "rgb(75, 192, 192)",
                pointBorderColor: "transparent",
                borderWidth: 3,
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
                text: "Performance",
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
                max: 20,
                ticks: {
                    stepSize: 2,
                },
            },
        },
    };

    return (
        <St.CardStyled hoverable loading={loading}>
            <Line className="chart" data={datas} options={option} />
        </St.CardStyled>
    );
};

LineChart.propTypes = {
    data: PropTypes.array,
    loading: PropTypes.bool,
};

export default LineChart;
