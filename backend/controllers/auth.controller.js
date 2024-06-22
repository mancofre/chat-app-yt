import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signupUser = async (req, res) =>{
    try {
        const {fullname, username, password, confirPassword, gender} = req.body; 

        if( password !== confirPassword ){
            return res.status(400).json({error: "Las contraseñas no son iguales."});
        }

        const user =  await User.findOne({username});
        if( user ){
            return res.status(400).json({error: "Nombre de usuario ya existe."});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`; 
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`; 

        const newUser = new User({
            fullname,
            username,
            password: hashedPassword,
            gender,
            profilePic: gender === 'male' ? boyProfilePic : girlProfilePic
        });
        
        if( newUser ){
            generateTokenAndSetCookie(newUser._id, res)
            await newUser.save();
            res.status(201).json({
                _id: newUser._id,
                fullname: newUser.fullname,
                username: newUser.username,
                profilePic: newUser.profilePic

            });
        } else {
            return res.status(400).json({error: "Inormación del usuario incorrecta."});
        }        

    } catch (error) {
        console.log('error in signupUser Controller', error.message)
        res.status(500).json({error: 'Internal Server Error.'});
    }
}

export const loginUser = async (req, res) =>{
    try {
        const {username, password} = req.body;
        const user =  await User.findOne({username});
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

        if( !user || !isPasswordCorrect){
            return res.status(400).json({error: "Usuario no existe o contraseña incorrecta."});
        }

        generateTokenAndSetCookie(user._id, res);

        res.status(201).json({
            _id: user._id,
            fullname: user.fullname,
            username: user.username,
            profilePic: user.profilePic

        });

    } catch (error) {
        console.log('error in signupUser Controller', error.message)
        res.status(500).json({error: 'Internal Server Error.'});
    }
}

export const logoutUser = (req, res) =>{
    try {
        res.cookie('jwt', '', { maxAge: 0 });
        return res.status(200).json({error: "Usuario deslogueado correctamente."});
    } catch (error) {
        console.log('error in signupUser Controller', error.message)
        res.status(500).json({error: 'Internal Server Error.'});
    }
}

