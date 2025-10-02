import { body, validationResult } from "express-validator";
import jwt from 'jsonwebtoken'
export const validation = [
  // role: required, must be "teacher" or "admin"
  body("role")
    .notEmpty().withMessage("Role is required"),
    // .isIn(["teacher", "admin", "student"]).withMessage("Role must be either teacher or admin"),

  // fullname: required, only letters & spaces, min length 3
  body("fullname")
    .notEmpty().withMessage("Fullname is required")
    .isLength({ min: 3 }).withMessage("Fullname must be at least 3 characters")
    .matches(/^[a-zA-Z\s]+$/).withMessage("Fullname must contain only letters and spaces"),

  // email: required, must be valid
  body("email")
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Invalid email address")
    .normalizeEmail(),

  // password: required, min 6 chars
  body("password")
    .notEmpty().withMessage("Password is required")
    .isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),

  // confirm password: must match password
  body("cpassword")
    .notEmpty().withMessage("Confirm password is required")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),
];

//SCHOOL VALIDATION

export const schoolValidation = [
  // name: required, only letters & spaces
  body("name")
    .notEmpty().withMessage("Name is required")
    .isLength({ min: 3 }).withMessage("Name must be at least 3 characters long")
    .matches(/^[a-zA-Z\s]+$/).withMessage("Name must contain only letters and spaces"),

  // logo: required, must be an image file (by extension)
  body("logo")
    .notEmpty().withMessage("Logo is required")
    .matches(/\.(jpg|jpeg|png|gif|webp)$/i)
    .withMessage("Logo must be a valid image file (jpg, jpeg, png, gif, webp)"),

  // email: required, valid email
  body("email")
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Invalid email address"),

  // address: required, min 5 characters
  body("address")
    .notEmpty().withMessage("Address is required")
    .isLength({ min: 5 }).withMessage("Address must be at least 5 characters long"),

  // website: required, valid URL
  body("website")
    .notEmpty().withMessage("Website is required")
    .isURL().withMessage("Website must be a valid URL")
];


// Middleware to handle validation result
export const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// export { validation, validateRequest };


export const verifyUser = (req ,res , nxt) =>{
  const token = req.cookies['auth'];
  if(!token){
    console.log('access token needed');
    return ;
  }
  jwt.verify(token , 'goodness',(err ,user)=>{
    if(err){
      console.log('invalid or expired token')
    }else{
      req.user = user;
      nxt();
    }
  })
}
