import { Dashboard } from "../organisms/dashboard/Dashboard"
import { Tabs } from "../organisms/tabs/Tabs"

export const InitialTemplate = () => {
  return (
    <div className='flex flex-col justify-start items-center h-auto p-3 gap-4'>
      <div className="w-full flex flex-grow justify-start">
        <h1 className="text-primary-blue1">Biblioteca universitaria</h1>
      </div>
      <div className="w-full flex flex-grow justify-start">
        <Dashboard />
      </div>
      <div className="w-full flex flex-grow justify-start">
        <Tabs />
      </div>

    </div>
  )
}
