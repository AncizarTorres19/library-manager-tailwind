// Dependencies
import { useEffect } from "react";
// Components
// Assets
import { Icons } from "../../../assets/Icons/IconProvider";

const { CloseIcon } = Icons; // Iconos

export const Modal = ({
    actionButtonFist = null,
    actionButtonSecond = null,
    buttons = false,
    children,
    closeModal,
    height = "380px",
    isOpen,
    labelButtonFist = "Cancelar",
    labelButtonSecond = "Subir datos",
}) => {

    useEffect(() => {
        const handleKeyPress = (event) => {
            if (event.key === 'Escape') {
                closeModal();
            }
        };

        window.addEventListener('keydown', handleKeyPress);

        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [closeModal]);

    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-midnightBlue font-Sora">
                    <div className={`bg-white w-2/6 h-${height} rounded-lg p-8`}>
                        <div className="flex justify-end">
                            <img
                                className="w- h-4 cursor-pointer border border-gray-300 rounded-full opacity-50 hover:opacity-100"
                                alt=""
                                src={CloseIcon}
                                onClick={() => closeModal()}
                            />
                        </div>

                        {children}

                        {buttons && (
                            <div className='flex gap-6 justify-end'>
                                <button
                                    onClick={closeModal}
                                    className='text-dimgray-100 font-normal text-base underline'
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={actionButtonSecond}
                                    className='bg-lightBlue text-white rounded-md px-4 py-2 text-base font-semibold'
                                >
                                    Finalizar asignación
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}

