import { validateColaborador, validatePartialColaborador } from "../schemas/colaborador.schema.js";
import { createToken } from "../plugins/createJwt.plugin.js";

export class AuthController{

    constructor ({ColaboradorModel}){
        this.colaboradorModel = ColaboradorModel 
    }

    authColaborador = async (req, res) => {
        try {
            const result = await this.colaboradorModel.getAll(req.query);

            res.status(200).json(result);
        } catch (error) {
            console.error('Error al obtener los colaboradores:', error.message);
            res.status(500).json({ error: 'Error al obtener los colaboradores' });
        }
    }
    
}