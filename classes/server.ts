import express from "express";
import { SERVER_PORT } from "../global/environment";
import socketIO from "socket.io";
import http from "http";
// Importar el archivo de socket
import * as socket from "../sockets/sockets";

export default class Server {
  private static _instance: Server;

  public app: express.Application;
  public port: number;
  // Para emitir los eventos
  public io: socketIO.Server;
  private httpServer: http.Server;

  private constructor() {
    // Inicializando las variables
    this.app = express();
    this.port = SERVER_PORT;
    this.httpServer = new http.Server(this.app);
    this.io = socketIO(this.httpServer);
    // Llamar a la función para probar
    this.escucharSockets();
  }

  public static get instance() {
    return this._instance || (this._instance = new this());
  }

  // Escuchar sockets
  private escucharSockets() {
    console.log("Escuchando conexiones - sockets");
    this.io.on("connection", cliente => {
      console.log("Cliente conectado");
      // Servidor, también está pendiente del evento "mensaje"
      socket.mensaje(cliente, this.io);
      // Desconectado
      socket.desconectar(cliente);
    });
  }

  start(callback: () => void) {
    this.httpServer.listen(this.port, callback);
  }
}
