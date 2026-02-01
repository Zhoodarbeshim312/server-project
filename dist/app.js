"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes/routes"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const path_1 = __importDefault(require("path"));
const buildApp = () => {
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.use((0, cookie_parser_1.default)());
    app.use("/uploads", express_1.default.static(path_1.default.join(__dirname, "..", "uploads")));
    app.get("/", (req, res) => {
        res.status(200).json({
            success: true,
            message: "🚀 Server running! Welcome to API",
        });
    });
    app.use("/api/v1", routes_1.default);
    return app;
};
exports.default = buildApp;
//# sourceMappingURL=app.js.map