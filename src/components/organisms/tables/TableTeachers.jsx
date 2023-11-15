import { useState } from 'react'
//Assets
import { profesores } from '../../../Data';
import { Icons } from '../../../assets/Icons/IconProvider';
import { ArticlesModal } from '../modals/contents/ArticlesModal';

export const TableTeachers = () => {

  const [openModal, setOpenModal] = useState(false);
  const [dataModal, setDataModal] = useState({});//[nombre, editorial, categoria, disponibles, img]
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5; // Número de elementos por página

  const filteredData = profesores.filter(
    (item) =>
      item.documento.toLowerCase().includes(searchText.toLowerCase()) ||
      item.nombre.toLowerCase().includes(searchText.toLowerCase()) ||
      item.apellido.toLowerCase().includes(searchText.toLowerCase()) ||
      item.carrera.toLowerCase().includes(searchText.toLowerCase()) ||
      item.telefono.toLowerCase().includes(searchText.toLowerCase()) ||
      item.correo.toLowerCase().includes(searchText.toLowerCase())
  );

  const pageCount = Math.ceil(filteredData.length / itemsPerPage);
  const displayedData = filteredData.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < pageCount - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleOpenModal = (item) => {
    console.log('item', item)
    setDataModal(item);
    setOpenModal(true);
  }


  return (
    <div className="w-full overflow-hidden rounded-lg border border-gray-200 shadow-md p-3">
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
      <table className="w-full table-fixed border-collapse  text-left text-sm text-gray-500 rounded-lg">
        {/* Encabezados */}
        <thead className="h-12 bg-silverClear border-r border-silverClear">
          <tr>
            <th className="w-1/5">Nombres</th>
            <th className="w-fit">Documento</th>
            <th className="w-fit">Carrera</th>
            <th className="w-fit">Teléfono</th>
            <th className="w-1/4">Correo</th>
            <th className="w-fit"></th>
          </tr>
        </thead>
        {/* Cuerpo de la tabla */}
        <tbody className='bg-white divide-y divide-gray-200'>
          {displayedData.map((item, index) => (
            <tr key={index}>
              <td className="whitespace-normal p-3 w-36">
                <div className='flex items-center gap-2'>
                  <img className='w-8 h-8 rounded-full' src={item?.img} />
                  <div>
                    <p className='font-semibold text-base text-darkslategray-200 overflow-x-hidden'>{item?.nombre}</p>
                    <p className='text-dimgray-200 font-normal'>{item?.apellido}</p>
                  </div>
                </div>
              </td>
              <td className="whitespace-normal p-3">{item.documento}</td>
              <td className="whitespace-normal p-3">{item.carrera}</td>
              <td className="whitespace-normal p-3">{item.telefono}</td>
              <td className="whitespace-normal p-3">{item.correo}</td>
              <td className="whitespace-normal p-3 text-right">
                <button
                  disabled={item.disponibles === 0}
                  className='underline text-lightBlue font-semibold'
                  onClick={() => handleOpenModal(item)}
                >
                  Asignar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Paginador y botones de navegación */}
      <div className="flex justify-between mt-4">
        <p className='text-dimgray-200 font-normal text-base'>
          Página {currentPage + 1} de {pageCount}
        </p>
        <div className='flex gap-6'>
          <button
            onClick={handlePreviousPage} disabled={currentPage === 0}
            className='text-dimgray-100 font-normal text-base underline'
          >
            Anterior
          </button>
          <button
            onClick={handleNextPage}
            disabled={currentPage === pageCount - 1}
            className='bg-lightBlue text-white rounded-md px-4 py-2 text-base font-semibold'
          >
            Siguiente
          </button>
        </div>
      </div>
      {openModal && (<ArticlesModal isOpen={openModal} dataModal={dataModal} closeModal={() => setOpenModal(false)} />)}
    </div>
  )
}
