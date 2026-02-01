"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cors_1 = __importDefault(require("cors"));
const auth_routes_1 = __importDefault(require("../modules/auth/auth.routes"));
const crud_routes_1 = __importDefault(require("../modules/crud/crud.routes"));
const user_routes_1 = __importDefault(require("../modules/user/user.routes"));
const globalRouter = (0, express_1.Router)();
const corsConfig = {
    origin: ["http://localhost:3000", "http://localhost:5173"],
    credentials: true,
};
globalRouter.use("/auth", (0, cors_1.default)(corsConfig), auth_routes_1.default);
globalRouter.use("/crud", (0, cors_1.default)(corsConfig), crud_routes_1.default);
globalRouter.use("/user", (0, cors_1.default)(corsConfig), user_routes_1.default);
exports.default = globalRouter;
//# sourceMappingURL=routes.js.map