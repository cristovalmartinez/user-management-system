import { User } from "../models/User" // Import the User model
import bcrypt from "bcrypt"

/**
 * User Service
 * @description A service for user-related operations such as user registration.
 */
export class UserService {
  /**
   * Register a new user.
   * @param {string} username - The username of the user to register.
   * @param {string} email - The email address of the user to register.
   * @param {string} password - The plaintext password of the user to register.
   * @returns {Promise<User>} A promise that resolves to the registered user object.
   * @throws {Error} Throws an error if registration fails.
   */
  async registerUser(
    username: string,
    email: string,
    password: string
  ): Promise<User> {
    try {
      // Hash the password before saving it to the database
      const hashedPassword = await bcrypt.hash(password, 10)

      // Create a new user in the database
      const user = await User.create({
        id: 123,
        username,
        email,
        password: hashedPassword,
        role: "admin",
      })

      return user
    } catch (error) {
      //TODO: use logger to log the error and provide an error message.
      console.error("Error in registerUser:", error)
      throw new Error("Registration failed. Please try again later.") // Provide a more meaningful error message
    }
  }
}
