
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

export default function CardPerson() {
    return (
        <div className="flex flex-row w-[560px] max-w-[560px] h-[319px] max-h-[319px]">
            <div className="flex flex-col p-4 w-full max-h-[319px] bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold leading-none text-gray-900 dark:text-white">Personas con alerta</h3>
                </div>
                <div className="flow-root overflow-y-auto">
                    <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">

                        {dataPerson.map((person) => (
                            <li key={person.id} className="py-3 sm:py-4">
                                <div className="flex items-center space-x-4">
                                    <div className="flex-shrink-0">
                                        <img className="w-8 h-8 rounded-full" src={person.img} alt="Neil image"></img>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                            {person.name}
                                        </p>
                                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                            {person.books} Libros | Entrega: {person.date}
                                        </p>
                                    </div>
                                    <div className="inline-flex items-center text-sm text-primary-btn1 dark:text-white">
                                        {person.status}
                                        <button
                                            className="w-12 h-12 rotate-90 font-bold text-forestGray hover:text-forestGreen"
                                        >
                                            ...
                                        </button>
                                    </div>
                                </div>
                                <hr className="w-5/6 mx-auto box-border h-0.5 border-t-[1px] border-solid border-lightgray-200" />
                                {/* <hr className="w-full mx-auto box-border h-0.5 border-t-[1px] border-solid border-lightgray-200" /> */}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}
