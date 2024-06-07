import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';

export const signupUser = async (req, res) =>{
    try {
        console.log(req.body)
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
        const girlProfilePic = `https://avatar.iran.liara.run/public/girld?username=${username}`; 

        const newUser = new User({
            fullname,
            username,
            password: hashedPassword,
            gender,
            profilePic: gender === 'male' ? boyProfilePic : girlProfilePic
        });

        await newUser.save();
        res.status(201).json({
            _id: newUser._id,
            fullname: newUser.fullname,
            username: newUser.username,
            profilePic: newUser.profilePic

        });

    } catch (error) {
        console.log('error in signupUser Controller', error.message)
        res.status(500).json({error: 'Internal Server Error.'});
    }
}

export const loginUser = (req, res) =>{
    res.send('login user')
}

export const logoutUser = (req, res) =>{
    res.send('logoutUser')
}

