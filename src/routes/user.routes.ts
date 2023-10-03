import express from "express"
import { UserController } from "../controllers/user.controller"
import { UserService } from "../services/user.service"

// Create an instance of Express app and a router
const app = express()
const router = express.Router()

// Create an instance of UserService and UserController
const userService = new UserService()
const userController = new UserController(userService)

/**
 * @route   POST /register
 * @desc    Register a new user
 * @access  Public
 */
router.route("/register").post(userController.registerUser)

// Mount the router under the "/api/v1/users" path
app.use("/api/v1/users", router)

export default app
