
// Dependencias
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";

//Components
import { Modal } from "../Modal";
import { SelectSimple } from "../../selects/SelectSimple";
import { TextInputSimple } from "../../inputs/TextInputSimple";
//Actions
import { assignArticleAction } from "../../../../redux/actions/HomeAction";
import { useAppDispatch } from "../../../../redux/store";
//Assets
import { Illustrations } from "../../../../assets/Illustrations/IllustrationProvider";
//Data
import { libros } from "../../../../Data";

export const ArticlesModal = ({ closeModal, isOpen, dataModal }) => {

    const defaultValues = {
        motion: '',
        date: '',
        book: ''
    }

    const {
        handleSubmit,
        register,
        reset,
        setValue,
        watch,
        control,
        formState: { errors }
    } = useForm({
        defaultValues // se inicializa el formulario con los valores por defecto
    });

    const dataForm = watch(); // Se obtienen los datos del formulario

    const dispatch = useAppDispatch(); // hook para ejecutar acciones de redux

    const { home: { personsAlerts } } = useSelector((state) => state.persistedData);

    const [selectedBook, setSelectedBook] = useState(null);//[nombre, editorial, categoria, disponibles, img

    const handleClick = () => {

        const obj = {
            "id": makeid(5),
            "img": "https://flowbite.com/docs/images/people/profile-picture-1.jpg",
            "name": "Luisa Fernanda Gómez Gómez",
            "books": 2,
            "date": "10-09-2023",
            "status": "Entregado"
        }
        dispatch(assignArticleAction());
    }

    const filterBooks = () => {
        const books = libros.filter((item) => item.id === Number(dataForm?.book))
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
                actionButtonSecond={() => handleClick()}
                buttons={true}
            >
                <p className="text-xl mb-4 font-bold">Asignar artículo</p>
                {selectedBook && (
                    <>
                        <div className='flex items-start gap-2'>
                            <img className='w-[54px] h-[57px] object-contain' src={Illustrations?.[selectedBook?.img]} />
                            <div className='flex flex-col items-start gap-2'>
                                <p className='font-semibold text-base text-darkslategray-200 overflow-x-hidden'>{selectedBook?.nombre}</p>
                                <p className='text-dimgray-200'>{selectedBook?.editorial}</p>
                            </div>
                        </div>
                        <div className='flex flex-col items-start gap-4 mt-6'>
                            <p className='text-dimgray-200'>Libro físico</p>
                            <p className='text-dimgray-200'>{selectedBook?.categoria}</p>
                            <p className='text-dimgray-200'>{selectedBook?.disponibles} Disponibles</p>
                        </div>
                    </>
                )}

                <div className='flex flex-col mt-5'>
                    <SelectSimple
                        errors={errors}
                        label='Libro'
                        nameRegister='book'
                        optionLabel='nombre'
                        options={libros}
                        optionValue='id'
                        placeholder='Selecciona una opción'
                        register={register}
                        validations={{ required: 'El libro es requerido' }}
                    />
                </div>
                <div className='flex flex-col mt-5'>
                    <SelectSimple
                        errors={errors}
                        label='Movimiento'
                        nameRegister='motion'
                        optionLabel='motion'
                        options={[{ motion: 'Prestar' }, { motion: 'Reparar' }]}
                        optionValue='motion'
                        placeholder='Selecciona una opción'
                        register={register}
                        validations={{ required: 'El movimiento es requerido' }}
                    />
                </div>
                <div className='flex flex-col w-full gap-2 mt-5 mb-6'>
                    <TextInputSimple
                        errors={errors}
                        label='Fecha de entrega'
                        nameRegister='date'
                        type="date"
                        register={register}
                        validations={{
                            required: 'La fecha es requerida',
                            pattern: {
                                value: /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/,
                                message: 'La fecha no es válida'
                            }
                        }}
                    />
                </div>
            </Modal >
        </>
    );
};