import fs from 'fs/promises';

export async function fileToBinary(file) {
    try {
        // Leer el archivo y convertirlo a binario
        const fileBuffer = await fs.readFile(file.path);
        // Eliminar el archivo físico
        await fs.unlink(file.path);
        return Buffer.from(fileBuffer);
    } catch (error) {
        console.error('Error al procesar el archivo:', error.message);
        throw new Error('No se pudo procesar el archivo.');
    }
}
