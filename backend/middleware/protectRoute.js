import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

const protectRoute = async ( req, res, next ) =>{
    try {
        
        const token = req.cookies.jwt;
        if( !token ){
            res.status(401).json({error: 'No autorizado - No existe Token'});
        }
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if( !decoded ){
            res.status(401).json({error: 'No autorizado - Token incorrecto'});
        }

        const user = await User.findById(decoded.userId).select('-password');
        if( !user ){
            res.status(401).json({error: 'Usuario no encontrado'});
        }

        req.user = user;
        next();
    } catch (error) {
        console.log('error in signupUser Controller', error.message)
        res.status(500).json({error: 'Internal Server Error.'});
    }
};


export default protectRoute;