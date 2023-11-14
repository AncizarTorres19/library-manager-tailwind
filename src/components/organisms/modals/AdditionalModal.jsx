import React, { useEffect, useState } from "react";
import { ButtonTypeA } from "../../common/molecules/buttons/buttonTypeA/ButtonTypeA";
import { useForm } from "react-hook-form";
import { SelectionCard } from "../selectionCard/SelectionCard";

export const AdditionalModal = ({isModalOpenA , setIsModalOpenA , handleDataInput , next , setDataAditional ,dataAditional  })=>{

    const CloseModal = () => {
        setIsModalOpenA(false);
    };
    const[stateInput , setStateInput] = useState()

    
    

    const {setValue} = useForm();

    useEffect(() => {
        const arryIsChecked = dataAditional.filter(item => item.isChecked === true)
        setValue('dataAdditional', arryIsChecked.map(item => item.id))
        setStateInput(arryIsChecked)
        handleDataInput(arryIsChecked)
      }, [dataAditional])

      


    return(
        <>
            {isModalOpenA && (
                

                <div className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%)] max-h-screen bg-gray-900 bg-opacity-50 flex justify-center">
                <div className="relative w-full max-w-2xl max-h-full ml-48 mt-20">
                    <div className="relative bg-primary-gris1 rounded-lg shadow dark:bg-gray-700 p-12">
                        <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                Selecciona los datos adicionales
                            </h3>
                        </div>
                        <div className="p-6 space-y-6 h-96 overflow-y-scroll">

                            {dataAditional.map((data)=>(
                                <div key={data.id}>
                                    <SelectionCard
                                    id={data?.id}
                                    isSelected={data?.isChecked}
                                    name={data.data}
                                    setData={setDataAditional}
                                    aditionalEnergy={2}
                                    
                                    />
                                </div>
                            ))}
        
                        </div>
                        <div className= "flex justify-between mt-16 pb-10">                
                            <ButtonTypeA text='Cancelar' action={CloseModal} />
                            <ButtonTypeA
                                text='Siguiente'
                                bgColor='#FE5000'
                                txColor='#FFFFFF'
                                bdWidth='0px'
                                bgHvColor='#E6500B'
                                submitBtn={false}
                                action={next}
                            />
                        </div>
                    </div>
                </div>
            </div>
                
            )}
        </>
    )
}