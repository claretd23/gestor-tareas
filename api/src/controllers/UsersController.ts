import { UserModel } from "../models/Users";
import {Request,Response} from 'express'


export default{
    signUp:async (req:Request, res:Response)=>{
        try {
        const name = req.body.name;            
        const password = req.body.password;            
        const email = req.body.email;            
        const rol = req.body.rol; 
        
        if(!name || !password ||!email || !rol){
            res.status(400).json({msg:"Faltan parametros"})
            return;
        }
        //registro de la bd
        await UserModel.create({
            name,
            password,
            email,
            rol
        });

        res.status(200).json({msg:"el usuario fue almacenado"});

        } catch (error) {
            console.log("El Error:", error);
            res.status(500).json({msg:"Ocurrio un error"});
            return;
        }
    },
    signIn:async (req:Request, res:Response)=>{
        try {
            //obt datos
            const email = req.body.email
            const password = req.body.password

            const user = await UserModel.findOne({
                email,
                password
            })

            if (!user){
                res.status(400).json({msg:"no existe usuario con ese ID."})
                return;
            }
            res.status(200).json({msg:"Se inicio sesion", user})

        } catch (error) {
            console.log("El Error ocurrido", error);
            res.status(500).json({msg:"Ocurrio un error al iniciar sesion"});
            return;
        }
    }

}