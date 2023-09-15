import { Request, Response } from "express"
import { UserService } from "../services/user.service"

// api route handlers that interacts with the service object

export class UserController {
  private userService: UserService

  /**
   * Creates a new instance of UserController.
   * @param userService - The UserService instance used to handle user-related operations.
   */

  constructor(userService: UserService) {
    this.userService = userService
  }

  async registerUser(req: Request, res: Response): Promise<void> {
    const { username, email, password } = req.body

    try {
      const user = await this.userService.registerUser(
        username,
        email,
        password
      )
      res.json({ message: "User registered successfully", user })
    } catch (error) {
      res.status(500).json({ message: "Internal server error" })
    }
  }
}
