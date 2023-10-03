import { NextFunction, Request, Response } from "express"
import { UserService } from "../services/user.service"
import validateRequest from "../middlewares/validateRequest"
import { body } from "express-validator"

export class UserController {
  private userService: UserService

  /**
   * Creates a new instance of UserController.
   * @param userService - The UserService instance used to handle user-related operations.
   */
  constructor(userService: UserService) {
    this.userService = userService
  }

  async registerUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { username, email, password } = req.body

    try {
      const requestValidations = [
        body("username")
          .notEmpty()
          .withMessage("Username is required")
          .isString(),
        body("email").notEmpty().withMessage("Email is required").isEmail(),
        body("password")
          .notEmpty()
          .withMessage("Password is required")
          .isLength({ min: 6 }),
      ]

      // Ensure that userService is properly initialized
      if (!this.userService) {
        throw new Error("userService is not defined.")
      }

      await validateRequest(requestValidations)(req, res, next)

      // const user = await this.userService.registerUser(
      //   username,
      //   email,
      //   password
      // )

      // res.json({ message: "User registered successfully", user })
    } catch (error) {
      next(error)
    }
  }
}
