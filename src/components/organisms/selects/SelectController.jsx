// Dependencias
import { useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
// Axios
import { axiosClient } from '../../../../config/AxiosClient';
// Components
import { CustomAlert } from '../customAlert/CustomAlert';

export const SelectController = ({
    apiUrl,
    control,
    disabled = false,
    label = 'Seleccione',
    labelKey,
    name,
    placeholder,
    rules = {},
    staticData = null,
    valueKey,
    styleDiv = 'flex flex-col w-2/4',
    styleSelect = 'mt-1 block w-full pl-3 pr-10 py-2 text-base border-[0.5px] border-[#627173] bg-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md',
    styleLabel = 'text-left text-gray-600 font-normal leading-6 text-base opacity-100',
}) => {
    const [list, setList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosClient.get(apiUrl);
                const data = response.data.data ? response.data.data : [];
                setList(data);
            } catch (error) {
                console.log(error);
            }
        };

        if (apiUrl && !staticData) {
            fetchData();
        } else {
            setList(staticData || []);
        }
    }, [apiUrl, staticData]);

    return (
        <div className={styleDiv}>
            <label className={styleLabel}>
                {label}
            </label>
            <Controller
                control={control}
                name={name}
                rules={rules}
                render={({ field, fieldState: { error } }) => (
                    <>
                        <select
                            {...field}
                            className={styleSelect}
                            disabled={disabled}
                        >
                            <option value='' style={{ display: 'none' }}>
                                {placeholder}
                            </option>
                            {list.map((item) => (
                                <option key={item[valueKey]} value={item[valueKey]}>
                                    {item[labelKey]}
                                </option>
                            ))}
                        </select>
                        {error && (
                            <CustomAlert message={error.message} type='error' />
                        )}
                    </>
                )}
            />
        </div>
    );
};



// Como usarlo en un componente:
{/* <SelectController
    control={control}
    name={`vehicles[${formIndex}].typeInput`}
    apiUrl='/insumos/vehiculos'
    valueKey='id'
    labelKey='nombre'
    placeholder='Selecciona un tipo'
/> */}
