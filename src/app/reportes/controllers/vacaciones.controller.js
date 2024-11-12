


export class VacacionesController{

    constructor ({vacacionesModel}){
        this.vacacionesModel = vacacionesModel 
    }

    getAll = async (req, res) => {
        try {
            const result = await this.vacacionesModel.getAll(req.query);

            res.status(200).json(result);
        } catch (error) {
            console.error('Error al obtener los colaboradores:', error.message);
            res.status(500).json({ error: 'Error al obtener los colaboradores' });
        }
    }
    
    getById = async (req, res) => {
        try {
            const { id } = req.params; 
            const result = await this.vacacionesModel.getById({id})

            if (result) return res.json(result)
            return res.status(500).json({error:'ocurrio un error'})
        } catch (error) {
            throw error
        }
    }

    register = async (req, res) => {
        const validate = await validateColaborador(req.body);
    
        if (!validate.success) return res.status(422).json({ error: JSON.parse(validate.error.message) });
    
        console.log(validate.data);
        
        const result = await this.vacacionesModel.register(validate.data);
    
        if (result) return res.json(result);
        
        return res.status(500).json({ error: 'ocurrio un error' });
    }
}