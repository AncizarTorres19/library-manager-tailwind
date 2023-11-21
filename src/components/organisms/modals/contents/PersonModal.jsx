
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
import { CustomSelect } from "../../selects/CustomSelect";

export const PersonModal = ({ closeModal, isOpen, dataModal }) => {

    const { home: { students, teachers } } = useSelector((state) => state.persistedData);

    const defaultValues = {
        date: '',
        motion: null,
        person: null,
        typePerson: null
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

    const handleClick = async () => {

        const obj = {
            libro_id: dataModal?.id,
            estudiante_id: dataForm?.typePerson?.value === 1 ? dataForm?.person?.value : null,
            profesor_id: dataForm?.typePerson?.value === 2 ? dataForm?.person?.value : null,
            fecha_entrega: dataForm?.date,
            estado: dataForm?.motion?.value === 1 ? 'Prestado' : 'En Reparación'
        }
        const { error, verify } = await dispatch(assignArticleAction(obj));
        error && console.log(error);
        verify && closeModal();
    }

    let persons = dataForm?.typePerson?.value === 1 ? students : teachers;

    const rebuildPersons = () => {
        if (!dataForm?.typePerson) return [];
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

    console.log(dataForm, 'dataForm')
    console.log(errors, 'errors')

    return (
        <>
            <Modal
                isOpen={isOpen}
                closeModal={closeModal}
                actionButtonFist={closeModal}
                handleSubmit={handleSubmit(handleClick)}
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
                    <CustomSelect
                        control={control}
                        name={'typePerson'}
                        staticData={[{ id: 1, tipo: 'Estudiante' }, { id: 2, tipo: 'Profesor' }]}
                        label='Estudiante o profesor'
                        rules={{ required: 'El estudiante o profesor es requerido' }}
                        keyLabel="tipo"
                    />
                </div>
                {dataForm?.typePerson && (
                    <div className='flex flex-col mt-1'>
                        <CustomSelect
                            control={control}
                            name={'person'}
                            staticData={rebuildPersons()}
                            label={dataForm?.typePerson?.value === 1 ? 'Estudiante' : 'Profesor'}
                            rules={{ required: 'El estudiante o profesor es requerido' }}
                            keyLabel="nombre"
                        />
                    </div>
                )}
                <div className='flex flex-col mt-2'>
                    <CustomSelect
                        control={control}
                        name={'motion'}
                        staticData={[{ id: 1, motion: 'Prestamo' }, { id: 2, motion: 'Repación' }]}
                        label='Movimiento'
                        rules={{ required: 'El movimiento es requerido' }}
                        keyLabel="motion"
                    />
                </div>
                <div className='flex flex-col w-full gap-2 mt-2 mb-3'>
                    <TextInputSimple
                        errors={errors}
                        label='Fecha de entrega'
                        nameRegister='date'
                        type="date"
                        register={register}
                        validations={{ required: false }}
                    />
                </div>
            </Modal >
        </>
    );
};