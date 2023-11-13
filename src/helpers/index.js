export const allowedExtensions = ['.jpg', '.png', '.pdf'];

function formatearFecha(fecha) {
    if (typeof fecha === 'string' && fecha.match(/^\d{4}-\d{2}-\d{2}$/)) {
        const partes = fecha.split('-');
        const [anio, mes, dia] = partes;
        return `${dia}/${mes}/${anio}`;
    }
    return fecha; // Devolver la fecha original si no es válida
}

export function calcularRangoDeFechas(...fechas) {
    // Filtrar y formatear las fechas válidas
    const fechasFormateadas = fechas
        .filter(fecha => fecha !== null && typeof fecha !== 'undefined' && fecha !== '' && !(fecha instanceof Date && isNaN(fecha)))
        .map(formatearFecha);

    // Unir las fechas formateadas con "-"
    return fechasFormateadas.join('-');
}

export function formatPercentage(input) {
    console.log('input', input)
    // Verifica si el valor de entrada es un porcentaje válido
    const percentageMatch = input.match(/^(\d+(\.\d+)?|\.\d+)/);
    // const percentageMatch = input.match(/^(\d+(\.\d+)?|\.\d+)%$/);

    if (!percentageMatch) {
        // Si el valor no coincide con un formato válido, devuelve null o realiza alguna acción de manejo de errores
        return null;
    }

    // Elimina el símbolo "%" si está presente
    const percentageWithoutSymbol = input.replace("%", "");

    console.log('percentageWithoutSymbol', percentageWithoutSymbol)

    // Convierte el valor a un número decimal
    const decimalPercentage = parseFloat(percentageWithoutSymbol) / 100;

    console.log('decimalPercentage', decimalPercentage)

    // Formatea el número decimal como un número entero con dos dígitos
    const formattedPercentage = (decimalPercentage * 100).toFixed(0).padStart(2, '0');

    console.log('formattedPercentage', formattedPercentage)

    // Devuelve el valor formateado
    return Number(decimalPercentage);
}

// export function formatPercentage(input) {
//     console.log('input', input);
//     // Verifica si el valor de entrada es un porcentaje válido
//     const percentageMatch = input.match(/^(\d+(\.\d+)?|\.\d+)/);

//     if (!percentageMatch) {
//         // Si el valor no coincide con un formato válido, devuelve null o realiza alguna acción de manejo de errores
//         return null;
//     }

//     // Elimina el símbolo "%" si está presente
//     const percentageWithoutSymbol = input.replace("%", "");

//     // Convierte el valor a un número decimal
//     const decimalPercentage = parseFloat(percentageWithoutSymbol) / 100;

//     // Formatea el número decimal como un número entero con dos dígitos
//     const formattedPercentage = (decimalPercentage * 100).toFixed(0).padStart(2, '0');

//     // Devuelve el valor formateado como una cadena
//     return Number(formattedPercentage);
// }


// Ejemplo de uso
// const userInput = "60%"; // Reemplaza con el valor ingresado por el usuario
// const formattedValue = formatPercentage(userInput);

// if (formattedValue !== null) {
//     console.log("Valor formateado:", formattedValue);
// } else {
//     console.error("El valor ingresado no es válido.");
// }
