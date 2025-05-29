import { ActivitiModel } from "../models/Activities";
import { UserModel } from '../models/Users';
import { Request, Response } from "express";

export default {
    create: async (req: Request, res: Response) => {
        try {
            const { title, dateEnd, description, status, idUser } = req.body;

            if (!title || !dateEnd || !description || !status || !idUser) {
                res.status(400).json({ msg: "Faltan apartados para crear la actividad" });
                return;
            }

            const activity = await ActivitiModel.create({ title, dateEnd, description, status, idUser });

            // Validar existencia de usuario
            const user = await UserModel.findById(idUser);
            if (!user) {
                res.status(400).json({ msg: "no existe usuario" });
                return;
            }

            res.status(200).json({ msg: "Tarea almacenada con éxito", task: activity });
        } catch (error) {
            console.log("El Error ocurrido", error);
            res.status(500).json({ msg: "no se pudo crear la tarea" });
        }
    },

    getActiv: async (req: Request, res: Response) => {
        try {
            const { idUser } = req.query;

            let activities;
            if (idUser) {
                const user = await UserModel.findById(idUser);
                if (!user) {
                    res.status(400).json({ msg: " no existe usuario" });
                    return;
                }

                activities = await ActivitiModel.find({ idUser });
            } else {
                activities = await ActivitiModel.find();
            }

            res.status(200).json({ msg: "Actividades agregadas", tasks: activities });
        } catch (error) {
            console.error("Error al obtener actividades", error);
            res.status(500).json({ msg: "hubo un problema al obtener las act.." });
        }
    },

    deleteActiv: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;

            if (!id) {
                res.status(400).json({ msg: "se necesita ID para eliminar la act.." });
                return;
            }

            if (!/^[0-9a-fA-F]{24}$/.test(String(id))) {
                res.status(400).json({ msg: "el ID no es correcto" });
                return;
            }

            const activity = await ActivitiModel.findById(id);
            if (!activity) {
                res.status(404).json({ msg: "No existe actividad" });
                return;
            }

            await ActivitiModel.deleteOne({ _id: id });

            res.status(200).json({ msg: "Actividad eliminada con éxito" });
        } catch (error) {
            console.error("Error al eliminar la actividad", error);
            res.status(500).json({ msg: "Ocurrió un error al eliminar la actividad" });
        }
    },

    UpdateActivi: async (req: Request, res: Response) => {
        try {
            const { id, title, dateEnd, description, status, idUser } = req.body;

            if (!id || !title || !dateEnd || !description || !status || !idUser) {
                res.status(400).json({ message: "Todos los apartados se requieren." });
                return;
            }

            const updatedActivity = await ActivitiModel.findByIdAndUpdate(
                id, { title, dateEnd, description, status, idUser },
                { new: true }
            );
            if (!updatedActivity) {
                res.status(404).json({ msg: "No se pudo encontrar la actividad" });
                return;
            }

            res.status(200).json({ message: "Actividad actualizada exitosamente.", data: updatedActivity });
        } catch (error) {
            console.log("Error al actualizar la actividad:", error);
            res.status(500).json({ message: "Error interno del servidor." });
        }
    }
};
