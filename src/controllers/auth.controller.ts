import { Request, Response } from "express"
import passport from "passport"
import { AuthService } from "../services/auth.service"

export class AuthController {
  private authService: AuthService

  constructor(authService: AuthService) {
    this.authService = authService
  }

  async login(req: Request, res: Response): Promise<void> {
    passport.authenticate(
      "local",
      { session: false },
      async (err: Error, user: any, info: any) => {
        try {
          if (err || !user) {
            return res.status(401).json({ message: "Authentication failed" })
          }

          const token = await this.authService.authenticateUser(
            user.email,
            req.body.password
          )

          if (!token) {
            return res.status(401).json({ message: "Authentication failed" })
          }

          return res.json({ token })
        } catch (error) {
          console.error(error)
          return res.status(500).json({ message: "Internal server error" })
        }
      }
    )(req, res)
  }
}
