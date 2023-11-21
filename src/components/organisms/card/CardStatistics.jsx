import { useSelector } from "react-redux";
import DoughnutChart from "../graphics/DoughnutChart";

const dataPerson = [
    {
        id: 1,
        img: 'https://flowbite.com/docs/images/people/profile-picture-1.jpg',
        name: 'Luisa Fernanda Gómez Gómez',
        books: 2,
        date: '10-09-2023',
        status: 'Entregado'
    },
    {
        id: 2,
        img: 'https://flowbite.com/docs/images/people/profile-picture-3.jpg',
        name: 'Ancizar Torres Lopez',
        books: 2,
        date: '10-09-2023',
        status: 'Entregado'
    },
    {
        id: 3,
        img: 'https://flowbite.com/docs/images/people/profile-picture-2.jpg',
        name: 'Michael Gough',
        books: 2,
        date: '10-09-2023',
        status: 'Entregado'
    },
    {
        id: 4,
        img: 'https://flowbite.com/docs/images/people/profile-picture-4.jpg',
        name: 'Lana Byrd',
        books: 2,
        date: '10-09-2023',
        status: 'Entregado'
    },
    {
        id: 5,
        img: 'https://flowbite.com/docs/images/people/profile-picture-5.jpg',
        name: 'Thomes Lean',
        books: 2,
        date: '10-09-2023',
        status: 'Entregado'
    },
];

export default function CardStatistics() {

    const { home: { articlesStatus } } = useSelector((state) => state.persistedData);

    const chartData = {
        labels: ['En reparación', 'Alerta de demora', 'Prestados'],
        datasets: [
            {
                label: 'Artículos',
                data: [articlesStatus?.reparacion, articlesStatus?.mora, articlesStatus?.prestados],
                backgroundColor: [
                    'rgba(33, 7, 255 )',
                    'rgba(221, 39, 0)',
                    'rgba(221, 255, 7)',
                    'rgba(185, 85, 92, 1)'
                ],
                borderColor: [
                    'rgba(33, 7, 255 )',
                    'rgba(221, 39, 0)',
                    'rgba(221, 255, 7)',
                    'rgba(185, 85, 92, 1)'
                ],
                borderWidth: 1,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false, // Oculta la leyenda en la parte superior
            },
        },
    };

    //Data for cards
    const dataGraph = [
        {
            "name": "Prestados",
            "value": articlesStatus?.prestados,
            "color": "bg-primary-yellow1"
        },
        {
            "name": "Alerta de demora",
            "value": articlesStatus?.mora,
            "color": " bg-red-700"
        },
        {
            "name": "En reparación",
            "value": articlesStatus?.reparacion,
            "color": "bg-blue-900"
        },
    ];

    return (
        <div className="flex flex-row w-[600px] max-w-[425px] h-[319px] max-h-[319px]">
            <div className="flex flex-col p-4 w-full max-h-[319px] bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold leading-none text-gray-900 dark:text-white">Estados de los artículos</h3>
                </div>
                <div className="flow-root overflow-y-auto w-full h-[180px]">
                    <DoughnutChart data={chartData} options={chartOptions} />
                </div>
                <div className="flex flex-wrap justify-between items-end">
                    {dataGraph.map(({ name, value, color }, index) => (
                        <div className="flex flex-col w-fit mr-3" key={index}>
                            <div className="flex items-center space-x-2 mt-6">
                                <div className={`w-3 h-3 rounded-full ${color}`}></div>
                                <div className="text-base tracking-[0.08px] leading-[22px] text-dimgray-200">
                                    {name}: {value}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    )
}
