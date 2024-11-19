export class ViewController {
    /*
    constructor({  }) {
        
    }
*/
    login = async (req, res) => {
        try {
            res.render('login', { error: null });
        } catch (error) {
            console.error('Error al iniciar sesión:', error.message);
            return res.status(500).json({ error: 'Error al iniciar sesión' });
        }
    };

    inicio = async (req, res) => {
        try {
            res.render('inicio');
            console.log(req.user)
        } catch (error) {
            console.error('Error al iniciar sesión:', error.message);
            return res.status(500).json({ error: 'Error al iniciar sesión' });
        }
    };
}