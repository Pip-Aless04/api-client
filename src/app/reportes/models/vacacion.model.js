import sql from 'mssql';
import { connection } from "../../db/db_connection.js";

export class VacacionesModel{
    
    static async getAll (filters) {

        try {
            
    
        } catch (err) {
            console.error('Error al obtener los colaboradores:', err.message);
            throw new Error('Error al obtener los colaboradores');
        }
    }
    

    static async getById ({id}) {
        try {

        } catch (error) {
            console.log('error al ejecutar la consulta')
            throw error
        }
    }

    static async register ({}) {

    }

    static async () {
        
    }
}