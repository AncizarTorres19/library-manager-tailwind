import CardPerson from "../card/CardPerson"
import CardStatistics from "../card/CardStatistics"

export const Dashboard = () => {
    return (
        <div className='flex flex-row justify-start items-center h-auto p-3 gap-4'>
            <CardPerson />
            <CardStatistics />
        </div>
    )
}
