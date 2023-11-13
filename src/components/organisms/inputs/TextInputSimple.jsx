// Components
import { CustomAlert } from "../customAlert/CustomAlert";

export const TextInputSimple = ({
    disabled = false,
    errors,
    hadleOnEnter = () => { },
    label,
    nameRegister,
    placeholder = 'Ingrese',
    register,
    type = 'text',
    validations,
}) => {

    return (
        <>
            <label className='text-f18 text-black'>{label}</label>
            <input
                className='rounded-md border border-black px-3 py-2'
                type={type}
                placeholder={placeholder}
                disabled={disabled}
                {...register(nameRegister, validations)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        hadleOnEnter();
                    }
                }}
            />
            {errors && errors[nameRegister] && (
                <CustomAlert
                    message={errors[nameRegister].message}
                    type='error'
                />
            )}
        </>
    );
}
