import express from "express"
import { UserController } from "../controllers/user.controller"
import { UserService } from "../services/user.service"

const app = express()
const router = express.Router()
const userService = new UserService()
const userController = new UserController(userService)

/**
 * @route   POST /register
 * @desc    register a new user
 * @access  Public
 */
router.route("/register").post(userController.registerUser)

app.use("/api/v1/users", router)

export default app
