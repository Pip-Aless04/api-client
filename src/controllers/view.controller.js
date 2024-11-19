export class ViewController {
    /*
    constructor({  }) {
        
    }
*/
    login = async (req, res) => {
        try {
            res.clearCookie('access_token');
            res.render('login', { error: null });
        } catch (error) {
            console.error('Error al iniciar sesión:', error.message);
            return res.status(500).json({ error: 'Error al iniciar sesión' });
        }
    };

    requestChangePassword = async (req, res) => {
        try {
            res.render('request-change-password', { error: null });
        } catch (error) {
            console.error('Error al iniciar sesión:', error.message);
            return res.status(500).json({ error: 'Error al iniciar sesión' });
        }
    };

    resetPassword = async (req, res) => {
        try {
            res.render('reset-password', { error: null });
        } catch (error) {
            console.error('Error al iniciar sesión:', error.message);
            return res.status(500).json({ error: 'Error al iniciar sesión' });
        }
    };

    inicio = async (req, res) => {
        try {
            const user = req.user.info;
            res.render('inicio', { user });
        } catch (error) {
            console.error('Error al iniciar sesión:', error.message);
            return res.status(500).json({ error: 'Error al iniciar sesión' });
        }
    };
}