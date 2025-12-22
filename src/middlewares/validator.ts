import { body } from "express-validator";

const validate = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ max: 50, min: 1 })
    .withMessage(`Title must be between 1 and 50 characters.`),

  body("released")
    .trim()
    .notEmpty()
    .withMessage("Release year is required")
    .isInt({ max: 2050, min: 1950 })
    .withMessage("Release year must be between 1950 and 2050")
    .toInt(),
];

export { validate };
