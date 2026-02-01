"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerDocs = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const PORT = Number(process.env.PORT) || 3000;
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API Documentation",
            version: "1.0.0",
            description: "API docs for my Express app",
        },
        servers: [
            {
                url: `http://localhost:${PORT}/api/v1`,
            },
        ],
    },
    // 👇 ВАЖНО
    apis: ["./src/modules/**/*.routes.ts", "./src/modules/**/*.controller.ts"],
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
const swaggerDocs = (app, port) => {
    app.use("/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
    console.log(`✅ Swagger Docs running at http://localhost:${port}/docs`);
};
exports.swaggerDocs = swaggerDocs;
//# sourceMappingURL=swagger.js.map