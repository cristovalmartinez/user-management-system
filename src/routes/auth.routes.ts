import { Router, Request, Response } from "express"
import passport from "passport"
import { AuthService } from "../services/auth.service"

const router = Router()
const authService = new AuthService()

router.post("/login", async (req: Request, res: Response) => {
  passport.authenticate(
    "local",
    { session: false },
    async (err: Error, user: any, info: any) => {
      try {
        if (err || !user) {
          return res.status(401).json({ message: "Authentication failed" })
        }

        const token = await authService.authenticateUser(
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
})

export default router
