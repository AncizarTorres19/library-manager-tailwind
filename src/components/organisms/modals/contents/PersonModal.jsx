
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
import { profesores, estudiantes } from "../../../../Data";

export const PersonModal = ({ closeModal, isOpen, dataModal }) => {

    const defaultValues = {
        motion: '',
        date: '',
        person: ''
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

    const persons = [...profesores, ...estudiantes] // Se unen los profesores y estudiantes en un solo array

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

    const rebuildPersons = () => {
        const newPersons = persons.map((item) => {
            return {
                ...item,
                nombre: `${item.nombre} ${item.apellido} - ${item.documento} - (${item.tipo})`
            };
        });
        return newPersons;
    };

    const filterBooks = () => {
        const person = persons.filter((item) => item.id === Number(dataForm?.person))
        if (person.length > 0) setSelectedBook(person[0]);
    }

    useEffect(() => {
        filterBooks();
    }, [dataForm?.person])

    return (
        <>
            <Modal
                isOpen={isOpen}
                closeModal={closeModal}
                actionButtonFist={closeModal}
                actionButtonSecond={() => handleClick()}
                buttons={true}
            >
                <p className="text-xl mb-4 font-bold">Asignar a:</p>
                {selectedBook && (
                    <>
                        <div className='flex items-start gap-2'>
                            <img className='w-16 h-16 rounded-full' src={selectedBook?.img} />
                            <div className='flex flex-col items-start gap-2'>
                                <p className='font-semibold text-base text-darkslategray-200 overflow-x-hidden'>{selectedBook?.nombre}</p>
                                <p className='text-dimgray-200'>{selectedBook?.apellido}</p>
                            </div>
                        </div>
                        <div className='flex flex-col items-start gap-4 mt-6'>
                            <p className='text-dimgray-200'>{selectedBook?.tipo}</p>
                            <p className='text-dimgray-200'>{selectedBook?.tipo === 'Profesor' ? 'Titulo' : 'Programa'}: {selectedBook?.carrera}</p>
                            <p className='text-dimgray-200'>Documento: {selectedBook?.documento}</p>
                        </div>
                    </>
                )}

                <div className='flex flex-col mt-5'>
                    <SelectSimple
                        errors={errors}
                        label='Estudiante o profesor'
                        nameRegister='person'
                        optionLabel='nombre'
                        options={rebuildPersons()}
                        optionValue='id'
                        placeholder='Selecciona una opción'
                        register={register}
                        validations={{ required: 'El estudiante o profesor es requerido' }}
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