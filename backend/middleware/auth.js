const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    // Obtener el token del header
    const token = req.header('Authorization')?.replace('Bearer ', '');

    // Verificar si no hay token
    if (!token) {
        return res.status(401).json({ error: 'No token, authorization denied' });
    }

    try {
        // Verificar el token
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secreto');
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ error: 'Token is not valid' });
    }
};

module.exports = authMiddleware;