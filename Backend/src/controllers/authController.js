const Usuario = require('../controllers/usuariosController');

exports.login = async (req, res) => {
    const { correo, contra } = req.body;

    try {
        // Llama al método estático authUser del modelo Usuario para autenticar al usuario
        const user = await Usuario.authUser(correo, contra);

        // Si no se encuentra ningún usuario, devuelve un estado de respuesta HTTP 401
        if (!user) {
            return res.status(401).json({ message: 'Credenciales inválidas', state: false });
        }

        // Si la autenticación es exitosa, devuelve un estado de respuesta HTTP 200
        res.status(200).json({ message: 'Inicio de sesión exitoso', id_usuario: user.id_usuario, state: true });
    } catch (error) {
        // Maneja cualquier error que ocurra durante la autenticación
        console.error('Error en login:', error);
        res.status(500).json({ error: error.message });
    }
};
