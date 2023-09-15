"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const passport_1 = __importDefault(require("passport"));
class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            passport_1.default.authenticate("local", { session: false }, (err, user, info) => __awaiter(this, void 0, void 0, function* () {
                try {
                    if (err || !user) {
                        return res.status(401).json({ message: "Authentication failed" });
                    }
                    const token = yield this.authService.authenticateUser(user.email, req.body.password);
                    if (!token) {
                        return res.status(401).json({ message: "Authentication failed" });
                    }
                    return res.json({ token });
                }
                catch (error) {
                    console.error(error);
                    return res.status(500).json({ message: "Internal server error" });
                }
            }))(req, res);
        });
    }
}
exports.AuthController = AuthController;
