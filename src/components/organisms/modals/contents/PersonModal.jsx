
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

export const PersonModal = ({ closeModal, isOpen, dataModal }) => {

    const { home: { students, teachers } } = useSelector((state) => state.persistedData);

    const defaultValues = {
        date: '',
        motion: '',
        person: '',
        typePerson: ''
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


    const [selectedBook, setSelectedBook] = useState(null);//[nombre, editorial, categoria, disponibles, img

    const handleClick = async () => {

        const obj = {
            libro_id: dataModal?.id,
            estudiante_id: dataForm?.typePerson === '1' ? dataForm?.person : null,
            profesor_id: dataForm?.typePerson === '2' ? dataForm?.person : null,
            fecha_entrega: dataForm?.date,
            estado: dataForm?.motion === '1' ? 'Prestado' : 'En Reparación'
        }
        const { error, verify } = await dispatch(assignArticleAction(obj));
        error && console.log(error);
        verify && closeModal();
    }

    let persons = dataForm?.typePerson === '1' ? students : teachers;

    const rebuildPersons = () => {
        if (dataForm?.typePerson === '') return [];
        const newPersons = persons.map((item) => {
            return {
                ...item,
                nombre: `${item.nombre} ${item.apellido} | cc: ${item.documento}`
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
                <p className="text-xl mb-1 font-bold">Asignar a:</p>
                {selectedBook && (
                    <>
                        <div className='flex items-end justify-center gap-1'>
                            <img className='w-2/4 h-2/4 rounded-full' src={selectedBook?.img} />
                        </div>
                        <div className='flex flex-col items-start gap-1'>
                            <p className='text-dimgray-200'>{selectedBook?.rol}: {selectedBook?.nombre} {selectedBook?.apellido}</p>
                            <p className='text-dimgray-200'>{selectedBook?.rol === 'Profesor' ? 'Titulo' : 'Programa'}: {selectedBook?.titulo}</p>
                        </div>
                    </>
                )}

                <div className='flex flex-col mt-1'>
                    <SelectSimple
                        errors={errors}
                        label='Estudiante o profesor'
                        nameRegister='typePerson'
                        optionLabel='tipo'
                        options={[{ id: 1, tipo: 'Estudiante' }, { id: 2, tipo: 'Profesor' }]}
                        optionValue='id'
                        placeholder='Selecciona una opción'
                        register={register}
                        validations={{ required: 'El estudiante o profesor es requerido' }}
                    />
                </div>
                {dataForm?.typePerson !== '' && (
                    <div className='flex flex-col mt-1'>
                        <SelectSimple
                            errors={errors}
                            label={dataForm?.typePerson === '1' ? 'Estudiante' : 'Profesor'}
                            nameRegister='person'
                            optionLabel='nombre'
                            options={rebuildPersons()}
                            optionValue='id'
                            placeholder='Selecciona una opción'
                            register={register}
                            validations={{ required: 'El estudiante o profesor es requerido' }}
                        />
                    </div>
                )}
                <div className='flex flex-col mt-2'>
                    <SelectSimple
                        errors={errors}
                        label='Movimiento'
                        nameRegister='motion'
                        optionLabel='motion'
                        options={[{ id: 1, motion: 'Prestamo' }, { id: 2, motion: 'Repación' }]}
                        optionValue='id'
                        placeholder='Selecciona una opción'
                        register={register}
                        validations={{ required: 'El movimiento es requerido' }}
                    />
                </div>
                <div className='flex flex-col w-full gap-2 mt-2 mb-3'>
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