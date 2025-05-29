import Express, { Application, Request, Response } from "express";
import cors from "cors";
import UsersController from "./controllers/UsersController";
import ActivitiesController from "./controllers/ActivitiesController";

const app: Application = Express();

app.use(cors());
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));

app.get("/", (_req: Request, res: Response) => {
  res.send("Hola desde mi servidor con Ts");
});

//usuario
app.post("/Ucreate", UsersController.signUp);
app.post("/Usign-in", UsersController.signIn);
//crear una tarea
app.post("/create", ActivitiesController.create);
//obtener tareas
app.get("/get", ActivitiesController.getActiv);
//eliminar tareas
app.delete("/delete/:id", ActivitiesController.deleteActiv);
//actualizar tareas
app.put("/update/:id", ActivitiesController.UpdateActivi);

export default app;
