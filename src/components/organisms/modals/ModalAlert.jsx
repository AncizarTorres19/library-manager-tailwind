// Dependencies
import { useEffect } from "react";
// Components
import { ButtonTypeA } from "../../common/molecules/buttons/buttonTypeA/ButtonTypeA";
// Assets
import { Icons } from "../../../assets/icons/IconProvider";
import { Illustrations } from "../../../assets/Illustrations/IllustrationProvider";

const { CloseIcon } = Icons; // Iconos
const { alert_form } = Illustrations; // Illustrations


export const ModalAlert = ({
    actionButtonFist = null,
    actionButtonSecond = null,
    buttons = false,
    children,
    closeModal,
    height = "380px",
    width = "1/4",
    isOpen,
    labelButtonFist = "Cancelar",
    labelButtonSecond = "Subir datos",
    iconAlert = "alert_form",
    titleAlert = "Información",
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
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-midnightBlue font-Sora">
                    <div className={`bg-white w-${width} h-${height} rounded-lg`}>
                        <div className="h-1/2 bg-lightMintGreen bg-no-repeat bg-0 bg-0 bg-padding-box p-8 rounded-lg">
                            <div className="flex justify-end">
                                <img
                                    className="w- h-4 cursor-pointer border border-gray-300 rounded-full opacity-50 hover:opacity-100"
                                    alt=""
                                    src={CloseIcon}
                                    onClick={() => closeModal()}
                                />
                            </div>
                            <div className="flex justify-center">
                                <p className="text-xl mb-4 font-bold">{titleAlert}</p>
                            </div>
                            <div className="flex justify-center">
                                <img
                                    alt={iconAlert}
                                    src={Illustrations[iconAlert]}
                                />
                            </div>
                        </div>

                        {children}

                        <div className="h-1/2 bg-white px-6 rounded-lg">
                            {buttons && (
                                <div className="flex items-center justify-between mb-12">
                                    {labelButtonFist && (
                                        <div className="pr-2 w-full">
                                            <ButtonTypeA text={labelButtonFist} action={() => actionButtonFist()} width="100%" />
                                        </div>
                                    )}
                                    <div className="pl-2 w-full">
                                        <ButtonTypeA
                                            width="100%"
                                            text={labelButtonSecond}
                                            bgColor='#FE5000'
                                            txColor='#FFFFFF'
                                            bdWidth='0px'
                                            bgHvColor='#E6500B'
                                            submitBtn={true}
                                            action={() => actionButtonSecond()}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

