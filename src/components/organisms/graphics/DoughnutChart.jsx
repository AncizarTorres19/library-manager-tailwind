import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function DoughnutChart({ data, options }) {
    return <Doughnut data={data} options={options} />;
}

export default DoughnutChart;