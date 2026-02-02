"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const token_1 = require("../config/token");
const authMiddleWare = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Требуется авторизация",
        });
    }
    try {
        const decoded = (0, token_1.verifyToken)(token);
        req.userId = decoded.userId;
        req.emailId = decoded.emailId;
        req.role = decoded.role;
        next();
    }
    catch {
        return res.status(401).json({
            success: false,
            message: "Токен недействителен",
        });
    }
};
exports.default = authMiddleWare;
//# sourceMappingURL=authMiddleWare.js.map