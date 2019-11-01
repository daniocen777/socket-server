import Server from "./classes/server";
import { SERVER_PORT } from "./global/environment";
import { router } from "./routes/router";
import bodyParser from "body-parser";
import cors from "cors";

const server = new Server();
// Para el envío de datos
server.app.use(bodyParser.urlencoded({ extended: true }));
server.app.use(bodyParser.json());

// Cors => Para que cualquier persona pueda llamar al servicio
server.app.use(cors({ origin: true, credentials: true }));

// Rutas
server.app.use("/", router);

server.start(() => {
  console.log(`Servidor corriendo en puerto ${SERVER_PORT}`);
});
