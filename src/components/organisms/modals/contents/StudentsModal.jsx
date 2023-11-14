
// Dependencias
import { useEffect, useState } from "react";

//Assets
import { Icons } from "../../../../assets/Icons/IconProvider";
//Components
import { Modal } from "../Modal";
import { Illustrations } from "../../../../assets/Illustrations/IllustrationProvider";
import { SelectSimple } from "../../selects/SelectSimple";
import { useForm } from "react-hook-form";
import { TextInputSimple } from "../../inputs/TextInputSimple";
import { useAppDispatch } from "../../../../redux/store";
import { useSelector } from "react-redux";
import { assignArticleAction } from "../../../../redux/actions/HomeAction";
import { libros } from "../../../../Data";

const { InformationIcon, TrushIcon } = Icons; //Iconos

export const StudentsModal = ({ closeModal, isOpen, dataModal, actionModal = () => { } }) => {

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

    const dispatch = useAppDispatch(); // hook para ejecutar acciones de redux

    const { home: { personsAlerts } } = useSelector((state) => state.persistedData);

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
                <div className='flex items-start gap-2'>
                    <img className='w-[54px] h-[57px] object-contain' src={Illustrations?.[dataModal?.img]} />
                    <div className='flex flex-col items-start gap-2'>
                        <p className='font-semibold text-base text-darkslategray-200 overflow-x-hidden'>{dataModal?.nombre}</p>
                        <p className='text-dimgray-200'>{dataModal?.editorial}</p>
                    </div>
                </div>
                <div className='flex flex-col items-start gap-4 mt-6'>
                    <p className='text-dimgray-200'>Libro físico</p>
                    <p className='text-dimgray-200'>{dataModal?.categoria}</p>
                    <p className='text-dimgray-200'>{dataModal?.disponibles} Disponibles</p>
                </div>
                <div className='flex flex-col mt-5'>
                    <SelectSimple
                        errors={errors}
                        label='Libro'
                        nameRegister='book'
                        optionLabel='nombre'
                        options={libros}
                        optionValue='editorial'
                        placeholder='Selecciona una opción'
                        register={register}
                        validations={{ required: 'El movimiento es requerido' }}
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