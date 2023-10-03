import { Request, Response, NextFunction } from "express"
import { validationResult, ValidationChain } from "express-validator"

const validateRequest = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      for (const validation of validations) {
        await validation.run(req)
      }

      const errors = validationResult(req)

      if (errors.isEmpty()) {
        return next()
      }

      return res.status(400).json({ errors: errors.array() })
    } catch (error) {
      next(error)
    }
  }
}

export default validateRequest
