const customStyles = {
    option: (provided, state) => ({
        ...provided,
        padding: '8px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        // background: '#000',
    }),
    singleValue: (provided) => ({
        ...provided,
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        // background: '#000',
    }),
    control: (provided) => ({
        ...provided,
        // width: 'fit-content',
        width: '100%',
        marginTop: '3px',
        // background: '#000',
        padding: '2px',
        borderRadius: '6px',
        border: '1px solid rgba(98 113 115)',
    }),
};

// Dependencias
import { useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
import Select from 'react-select';
// Axios
import { axiosClient } from '../../../../config/AxiosClient';
// Components
import { CustomAlert } from '../customAlert/CustomAlert';

export const CustomSelect = ({
    apiUrl = null,
    clearable = true,
    control,
    disabled = false,
    label = 'Seleccione',
    name,
    optionImage = false,
    placeholder,
    rules = {},
    searchable = true,
    staticData = null,
    keyOption = 'value',
}) => {
    const [list, setList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosClient.get(apiUrl);
                const data = response.data.data ? response.data.data : [];
                setList(data);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        };

        if (apiUrl && !staticData) {
            setIsLoading(true);
            fetchData();
        } else {
            setList(staticData || []);
        }
    }, [apiUrl, staticData]);

    return (
        <>
            <label className='text-left text-gray-600 font-normal leading-6 text-base opacity-100'>
                {label}
            </label>
            <Controller
                control={control}
                name={name}
                rules={rules}
                render={({ field, fieldState: { error } }) => (
                    <>
                        <Select
                            {...field}
                            placeholder={placeholder}
                            isDisabled={disabled}
                            isSearchable={searchable}
                            isLoading={isLoading}
                            isClearable={clearable}
                            options={list}
                            styles={customStyles}
                            getOptionLabel={(option) => (
                                <div>
                                    {optionImage && (
                                        <img
                                            src={`https://flagcdn.com/24x18/${option.value.toLowerCase()}.png`}
                                            alt={option.label}
                                        />
                                    )}
                                    {!optionImage && option[keyOption]}
                                </div>
                            )}
                        />
                        {error && (
                            <CustomAlert message={error.message} type='error' />
                        )}
                    </>
                )}
            />
        </>
    );
};



// Como usarlo en un componente:
{/* <CustomSelect
    control={control}
    name={'country'}
    optionImage={true}
    staticData={countryOptions}
    apiUrl='/ubicacion/paises'
    rules={{ required: "requerido" }}
    label='País'
    keyOption='nombre'
/> */}