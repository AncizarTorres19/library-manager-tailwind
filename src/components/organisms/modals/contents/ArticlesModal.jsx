
// Dependencias
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";

//Components
import { Modal } from "../Modal";
import { TextInputSimple } from "../../inputs/TextInputSimple";
//Actions
import { assignArticleAction } from "../../../../redux/actions/HomeAction";
import { useAppDispatch } from "../../../../redux/store";
//Assets
import { Illustrations } from "../../../../assets/Illustrations/IllustrationProvider";
import { CustomSelect } from "../../selects/CustomSelect";

export const ArticlesModal = ({ closeModal, isOpen, dataModal }) => {

    const { home: { articles } } = useSelector((state) => state.persistedData);

    const defaultValues = {
        motion: null,
        date: '',
        book: null
    }

    const {
        handleSubmit,
        register,
        watch,
        control,
        formState: { errors }
    } = useForm({
        defaultValues // se inicializa el formulario con los valores por defecto
    });

    const dataForm = watch(); // Se obtienen los datos del formulario

    const dispatch = useAppDispatch(); // hook para ejecutar acciones de redux

    const [selectedBook, setSelectedBook] = useState(null);//[nombre, editorial, categoria, disponibles, img

    console.log(dataForm, 'dataForm')
    console.log(dataModal, 'dataModal')
    const handleClick = async () => {

        const obj = {
            libro_id: dataForm?.book?.value,
            estudiante_id: dataModal?.rol === 'Estudiante' ? dataModal?.id : null,
            profesor_id: dataModal?.rol === 'Profesor' ? dataModal?.id : null,
            fecha_entrega: dataForm?.date,
            estado: dataForm?.motion?.value === 1 ? 'Prestado' : 'En Reparación'
        }
        const { error, verify } = await dispatch(assignArticleAction(obj));
        error && console.log(error);
        verify && closeModal();
    }

    const filterBooks = () => {
        const books = articles.filter((item) => item.id === Number(dataForm?.book?.value))
        if (books.length > 0) setSelectedBook(books[0]);
    }

    useEffect(() => {
        filterBooks();
    }, [dataForm?.book])

    return (
        <>
            <Modal
                isOpen={isOpen}
                closeModal={closeModal}
                actionButtonFist={closeModal}
                handleSubmit={handleSubmit(handleClick)}
                buttons={true}
            >
                <p className="text-xl mb-4 font-bold">Asignar artículo</p>
                {selectedBook && (
                    <>
                        <div className='flex items-start gap-1'>
                            <img className='w-[54px] h-[57px] object-contain' src={Illustrations?.IllustrationBook} />
                            <div className='flex flex-col items-start gap-2'>
                                <p className='font-semibold text-base text-darkslategray-200 overflow-x-hidden'>{selectedBook?.titulo}</p>
                                <p className='text-dimgray-200'>{selectedBook?.editorial}</p>
                            </div>
                        </div>
                        <div className='flex flex-col items-start gap-2 mt-6'>
                            <p className='text-dimgray-200'>Libro físico</p>
                            <p className='text-dimgray-200'>{selectedBook?.categoria}</p>
                            <p className='text-dimgray-200'>Ejemplares disponibles: {selectedBook?.cantidad_total - selectedBook?.cantidad_prestados - selectedBook?.cantidad_reparacion}</p>
                        </div>
                    </>
                )}

                <div className='flex flex-col mt-5'>
                    <CustomSelect
                        control={control}
                        name={'book'}
                        staticData={articles}
                        label='Libro'
                        rules={{ required: 'El libro es requerido' }}
                    />
                </div>
                <div className='flex flex-col mt-5'>
                    <CustomSelect
                        control={control}
                        name={'motion'}
                        staticData={[{ id: 1, motion: 'Prestamo' }, { id: 2, motion: 'Repación' }]}
                        label='Movimiento'
                        rules={{ required: 'El movimiento es requerido' }}
                        keyLabel="motion"
                    />
                </div>
                <div className='flex flex-col w-full gap-2 mt-5 mb-6'>
                    <TextInputSimple
                        errors={errors}
                        label='Fecha de entrega'
                        nameRegister='date'
                        type="date"
                        register={register}
                        validations={{ required: 'La fecha es requerida' }}
                    />
                </div>
            </Modal >
        </>
    );
};