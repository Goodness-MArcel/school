import express from "express";
import { validation , validateRequest,schoolValidation } from "../middleware/Authmiddleware/index.js";
import { handleSignup, handleSchoolRegistration ,handleLogin ,} from "../controller/index.js";
const router = express.Router();


router.post('/signup' ,validation,validateRequest, handleSignup);
router.post('/registerSchool' ,schoolValidation,validateRequest, handleSchoolRegistration);
router.post('/login', handleLogin)
// router.post('/handleLogin' , handleLogin);


// class example


export default router;