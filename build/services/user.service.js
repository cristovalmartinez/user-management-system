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
exports.UserService = void 0;
const User_1 = require("../models/User"); // Import the User model
const bcrypt_1 = __importDefault(require("bcrypt"));
/**
 * User Service
 * @description A service for user-related operations such as user registration.
 */
class UserService {
    /**
     * Register a new user.
     * @param {string} username - The username of the user to register.
     * @param {string} email - The email address of the user to register.
     * @param {string} password - The plaintext password of the user to register.
     * @returns {Promise<User>} A promise that resolves to the registered user object.
     * @throws {Error} Throws an error if registration fails.
     */
    registerUser(username, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Hash the password before saving it to the database
                const hashedPassword = yield bcrypt_1.default.hash(password, 10);
                // Create a new user in the database
                const user = yield User_1.User.create({
                    id: 123,
                    username,
                    email,
                    password: hashedPassword,
                    role: "admin",
                });
                return user;
            }
            catch (error) {
                //TODO: use logger to log the error and provide an error message.
                console.error("Error in registerUser:", error);
                throw new Error("Registration failed. Please try again later."); // Provide a more meaningful error message
            }
        });
    }
}
exports.UserService = UserService;
