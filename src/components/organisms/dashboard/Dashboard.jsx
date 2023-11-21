import { useSelector } from "react-redux";
//Components
import CardPerson from "../card/CardPerson"
import CardStatistics from "../card/CardStatistics"

export const Dashboard = () => {

    const { home: { asignments, articlesStatus } } = useSelector((state) => state.persistedData);

    return (
        <div className='flex flex-row justify-start items-center h-auto p-3 gap-4'>
            {asignments?.length > 0 && <CardPerson />}
            {articlesStatus?.total_libros_prestados_mora_reparacion !== 0 && <CardStatistics />}
        </div>
    )
}
