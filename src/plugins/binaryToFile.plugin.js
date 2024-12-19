import fs from 'fs/promises';
import path from 'path';

export async function binaryToFile(binaryData, outputPath) {
    try {
        // Escribir el buffer binario en un archivo físico
        await fs.writeFile(outputPath, binaryData);
        console.log(`Archivo generado exitosamente en: ${outputPath}`);
    } catch (error) {
        console.error('Error al escribir el archivo:', error.message);
        throw new Error('No se pudo generar el archivo.');
    }
}
