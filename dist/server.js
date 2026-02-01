"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const swagger_1 = require("./config/swagger");
const server = (0, app_1.default)();
const PORT = Number(process.env.PORT) || 3000;
const startServer = async () => {
    try {
        await new Promise((resolve, reject) => {
            server
                .listen({
                port: PORT,
                host: "0.0.0.0",
            }, () => {
                console.log(`${new Date()}`);
                console.log(`🚀 Server run in: http://localhost:${PORT}`);
                (0, swagger_1.swaggerDocs)(server, PORT);
                resolve();
            })
                .on("error", (error) => {
                reject(error);
            });
        });
    }
    catch (error) {
        console.log(`Server crashed: ${error}`);
        process.exit(1);
    }
};
startServer();
//# sourceMappingURL=server.js.map