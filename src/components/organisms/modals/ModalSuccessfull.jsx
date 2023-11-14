import React, { useContext } from "react";

import { Illustrations } from "../../../assets/Illustrations/IllustrationProvider";
import { ButtonTypeA } from "../../common/molecules/buttons/buttonTypeA/ButtonTypeA";
import { useNavigate } from "react-router-dom";
import { paths } from "../../../routes/paths";
import { NavigateAppContext } from "../../../context/NavigateAppContext";
const {Illustration_Succes} = Illustrations

export const ModalSuccessfull = ({isModalOpenB})=>{
    const {resetPage} = useContext(NavigateAppContext); // hook para navegar entre páginas
    const navigate = useNavigate()
    return(
        <>
            {isModalOpenB &&(
            <div className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%)] max-h-screen bg-gray-900 bg-opacity-50 grid place-items-center">
                    <div className="relative w-102 max-w-2xl max-h-full ml-56">
                        <div className="relative bg-primary-blue3 rounded-t-lg shadow dark:bg-gray-700 p-8 flex flex-col items-center">
                            <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="staticModal">
                                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                </svg>
                            </button>
                            <h1 className="text-2xl font-bold text-primary-blue1 mb-3">¡Felicidades!</h1>
                            <div>
                                <img src={Illustration_Succes} width={'50px'} alt="" />
                            </div>
                        </div>
                        <div className="relative bg-primary-white1 rounded-b-lg shadow dark:bg-gray-700 p-12">
                            <h1 className="text-lg text-primary-gris2 text-center mb-8">Proyecto creado correctamente</h1>
                            <ButtonTypeA
                            text='Ir a gestión de proyectos'
                            bgColor='#FE5000'
                            txColor='#FFFFFF'
                            bdWidth='0px'
                            bgHvColor='#E6500B'
                            submitBtn={false}
                            action={() => {navigate(paths.PROJECTMANAGEMENT)}}
                            width="100%"
                        />
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}