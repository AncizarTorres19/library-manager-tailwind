import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { changeStateAsignmentAction, getAsignmentsAction } from "../../../redux/actions/HomeAction";
import { useAppDispatch } from "../../../redux/store";
import { Searcher } from "../searcher/Searcher";

export default function CardPerson() {

    const dispatch = useAppDispatch(); // hook para ejecutar acciones de redux

    const { home: { asignments } } = useSelector((state) => state.persistedData);

    const [menuVisible, setMenuVisible] = useState(null);
    const [searchText, setSearchText] = useState('');
    const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
    const [data, setData] = useState([]);

    useEffect(() => {
        dispatch(getAsignmentsAction());
    }, []);

    useEffect(() => {
        setData(asignments);
    }, [asignments]);

    const toggleMenu = (rowIndex, e) => {
        const rect = e.target.getBoundingClientRect();
        const top = rect.top + window.scrollY - 20;
        const left = rect.left + window.scrollX - 210;

        setMenuPosition({ top, left });
        setMenuVisible(menuVisible === rowIndex ? null : rowIndex);
    };

    const dataPerson = (asignment) => {
        return {
            img: asignment?.Estudiante ? asignment?.Estudiante?.img : asignment?.Profesor?.img,
            name: asignment?.Estudiante ? asignment?.Estudiante?.nombre : asignment?.Profesor?.nombre,
            apellido: asignment?.Estudiante ? asignment?.Estudiante?.apellido : asignment?.Profesor?.apellido,
            documento: asignment?.Estudiante ? asignment?.Estudiante?.documento : asignment?.Profesor?.documento,
        };
    };

    const dividingLine = <hr className="w-5/6 mx-auto box-border h-0.5 border-t-[1px] border-solid border-lightgray-200" />;

    const changeState = async (id, state) => {
        const obj = {
            estado: state
        }
        const { error, verify } = await dispatch(changeStateAsignmentAction(id, obj));
        error && console.log(error);
        verify && setMenuVisible(null);
    };

    const filteredData = data.filter(
        (item) =>
            item.Estudiante?.nombre?.toLowerCase()?.includes(searchText.toLowerCase()) ||
            item.Estudiante?.apellido?.toLowerCase()?.includes(searchText.toLowerCase()) ||
            item.Estudiante?.documento?.toLowerCase()?.includes(searchText.toLowerCase()) ||
            item.Libro?.titulo?.toLowerCase()?.includes(searchText.toLowerCase()) ||
            item.fecha_asignacion?.toLowerCase()?.includes(searchText.toLowerCase()) ||
            item.fecha_entrega?.toLowerCase()?.includes(searchText.toLowerCase()) ||
            item.estado?.toLowerCase()?.includes(searchText.toLowerCase()) ||
            item.Profesor?.nombre?.toLowerCase()?.includes(searchText.toLowerCase()) ||
            item.Profesor?.apellido?.toLowerCase()?.includes(searchText.toLowerCase()) ||
            item.Profesor?.documento?.toLowerCase()?.includes(searchText.toLowerCase())
    );

    return (
        <div className="flex flex-row w-[700px] max-w-[760px] h-[360px] max-h-[360px]">
            <div className="flex flex-col p-4 w-full max-h-[360px] bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold leading-none text-gray-900 dark:text-white">Personas con asignaciones</h3>
                </div>
                <Searcher searchText={searchText} setSearchText={setSearchText} />
                <div className="flow-root overflow-y-auto">
                    <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                        {filteredData.map((asignment, rowIndex) => (
                            <li key={asignment.id} className="py-3 sm:py-4">
                                <div className="flex items-center space-x-4">
                                    <div className="flex-shrink-0">
                                        <img className="w-8 h-8 rounded-full" src={dataPerson(asignment).img} alt={asignment.name}></img>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                            {dataPerson(asignment).name} {dataPerson(asignment).apellido}
                                        </p>
                                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                            CC: {dataPerson(asignment).documento} | Asignado: {asignment.fecha_asignacion}
                                        </p>
                                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                            Libro: {asignment?.Libro?.titulo}  | Entrega: {asignment.fecha_entrega}
                                        </p>
                                    </div>
                                    <div className={`inline-flex items-center text-sm dark:text-white ${asignment.estado === 'Prestado' ? 'text-primary-btn1' : 'text-red-700'}`}>
                                        {asignment.estado}
                                    </div>
                                    <button
                                        className="w-12 h-12 rotate-90 font-bold text-forestGray hover:text-forestGreen"
                                        onClick={(e) => toggleMenu(rowIndex, e)}
                                    >
                                        ...
                                    </button>
                                    {menuVisible === rowIndex && (
                                        <div className="absolute w-fit border bg-white shadow-lg rounded-md font-medium text-base text-gray-900" style={{ top: `${menuPosition.top}px`, left: `${menuPosition.left}px` }}>
                                            <ul className="py-2">
                                                <li
                                                    onClick={() => changeState(asignment.id, 'Entregado')}
                                                    className="cursor-pointer px-2 py-1.5 hover:bg-lightgray-200 rounded-md"
                                                >
                                                    Marcar como devuelto
                                                </li>
                                                {dividingLine}
                                                <li
                                                    onClick={() => changeState(asignment.id, 'En Reparación')}
                                                    disabled={asignment.estado === 'En Reparación'}
                                                    className={`cursor-pointer px-2 py-1.5 hover:bg-lightgray-200 rounded-md ${asignment.estado === 'En Reparación' && 'opacity-50'}`}
                                                >
                                                    Marcar en reparación
                                                </li>
                                            </ul>
                                        </div>
                                    )}
                                </div>
                                <hr className="w-5/6 mx-auto box-border h-0.5 border-t-[1px] border-solid border-lightgray-200" />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
