import { useEffect, useState } from "react";
import { Dashboard } from "../organisms/dashboard/Dashboard"
import { Tabs } from "../organisms/tabs/Tabs"
import { TableArticles } from "../organisms/tables/TableArticles";
import { TableStudents } from "../organisms/tables/TableStudents";
import { TableTeachers } from "../organisms/tables/TableTeachers";
import { useAppDispatch } from "../../redux/store";
import { getArticlesAction, getArticlesStatusAction, getStudentsAction, getTeachersAction } from "../../redux/actions/HomeAction";

export const InitialTemplate = () => {

  const dispatch = useAppDispatch(); // hook para ejecutar acciones de redux

  const tabs = [
    {
      label: 'Artículos',
      icon: 'Articles',
      iconSelected: 'SelectedArticles',
      tableComponent: TableArticles,
    },
    {
      label: 'Estudiantes',
      icon: 'Students',
      iconSelected: 'SelectedStudents',
      tableComponent: TableStudents,
    },
    {
      label: 'Profesores',
      icon: 'Teachers',
      iconSelected: 'SelectedTeachers',
      tableComponent: TableTeachers,
    },
  ];

  const [activeTab, setActiveTab] = useState(0);

  const CurrentTable = tabs[activeTab].tableComponent;

  useEffect(() => {
    dispatch(getArticlesAction());
    dispatch(getStudentsAction());
    dispatch(getTeachersAction());
    dispatch(getArticlesStatusAction());
  }, []);

  return (
    <div className='flex flex-col justify-start items-center h-auto p-3 gap-4'>
      <div className="w-full flex flex-grow justify-start">
        <h1 className="text-primary-blue1">Biblioteca universitaria</h1>
      </div>
      <div className="w-full flex flex-grow justify-start">
        <Dashboard />
      </div>
      <div className="w-full flex flex-grow justify-start">
        <Tabs
          tabs={tabs}
          onTabChange={(index) => setActiveTab(index)}
        />
      </div>
      <div className="w-full flex flex-grow justify-start">
        <CurrentTable />
      </div>

    </div>
  )
}
