import { Icons } from "../../../assets/Icons/IconProvider";

export const Searcher = ({ searchText, setSearchText }) => {

    return (
        <div className="flex items-center mb-4 relative">
            <img className='w-[24px] h-[24px] absolute left-3 top-1/2 transform -translate-y-1/2' src={Icons?.Search} />
            <input
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Buscar..."
                // className="p-2 border rounded-full w-2/4 border-gray-400 focus:outline-none focus:ring-2 focus:ring-lightBlue focus:border-transparent"
                className="pl-10 pr-2 p-1 border rounded-full w-2/4 border-gray-400 focus:outline-none focus:ring-2 focus:ring-lightBlue focus:border-transparent"
            />
            <img className='w-[24px] h-[24px] ml-2' src={Icons?.Filter} />
        </div>
    )
}
