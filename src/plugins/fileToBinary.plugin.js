import fs from 'fs/promises';

export async function fileToBinary(file) {
    const fileBuffer = await fs.readFile(file.path);
    await fs.unlink(file.path);
    return Buffer.from(fileBuffer);
}