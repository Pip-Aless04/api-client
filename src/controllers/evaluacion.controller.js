
export class EvaluacionController{

    constructor ({EvaluacionModel}){
        this.evaluacionModel = EvaluacionModel 
    }

    evaluacion = async (req, res) => {
        try {
            const result = await this.evaluacionModel.getAll(req.query);

            res.status(200).json(result);
        } catch (error) {
            console.error('Error al obtener los colaboradores:', error.message);
            res.status(500).json({ error: 'Error al obtener los colaboradores' });
        }
    }
    calificar = async (req, res) => {
        try {
            const result = await this.evaluacionModel.getAll(req.query);

            res.status(200).json(result);
        } catch (error) {
            console.error('Error al obtener los colaboradores:', error.message);
            res.status(500).json({ error: 'Error al obtener los colaboradores' });
        }
    }
    getResultado = async (req, res) => {
        try {
            const result = await this.evaluacionModel.getAll(req.query);

            res.status(200).json(result);
        } catch (error) {
            console.error('Error al obtener los colaboradores:', error.message);
            res.status(500).json({ error: 'Error al obtener los colaboradores' });
        }
    }
    getPdi = async (req, res) => {
        try {
            const result = await this.evaluacionModel.getAll(req.query);

            res.status(200).json(result);
        } catch (error) {
            console.error('Error al obtener los colaboradores:', error.message);
            res.status(500).json({ error: 'Error al obtener los colaboradores' });
        }
    }
    
}