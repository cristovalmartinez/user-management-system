import { User } from "../models/User"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export class AuthService {
  async authenticateUser(
    email: string,
    password: string
  ): Promise<string | null> {
    const user = await User.findOne({ where: { email } })

    if (!user) {
      return null // User not found
    }

    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
      return null // Incorrect password
    }

    const token = jwt.sign({ userId: user.id }, "your-secret-key", {
      expiresIn: "1h",
    })
    return token
  }
}
