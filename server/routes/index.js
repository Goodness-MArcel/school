import express from "express";
import { upload } from "../controller/uploadController.js";
import { validation , validateRequest,schoolValidation } from "../middleware/Authmiddleware/index.js";
import { verifySupabaseToken } from "../supabase.js";
import { userChecker } from "../controller/checkUserExist.js";
import { handleSignup, handleSchoolRegistration ,handleLogin ,editSchoolInfo,getSchoolProfile ,editAdminProfile, getAdminProfile} from "../controller/index.js";
const router = express.Router();
// ===============================
// School Management Routes
// ===============================

// Verify whether any user exists before displaying the School Registration page
router.get('/checkSchool', userChecker);

// Handle new user registration with validation
router.post('/signup', validation, validateRequest, handleSignup);

// Register a new school with logo upload support (multipart/form-data)
router.post('/registerSchool', upload.single('logo'), schoolValidation, validateRequest, handleSchoolRegistration);

// Authenticate existing users (login)
router.post('/login', handleLogin);

// ===============================
// School Management & Admin Updates
// ===============================

// Update school information (with optional logo upload)
router.put('/updateSchool', upload.single("logo"), editSchoolInfo);

// Retrieve school profile details
router.get('/getSchool/info', getSchoolProfile);

// ===============================
// Admin Management (Protected Routes)
// ===============================

// Retrieve admin profile (requires Supabase token verification)
router.get("/getSchool/adminInfo", verifySupabaseToken, getAdminProfile);

// Update admin profile (requires authentication and optional profile image upload)
router.put("/updateAdminProfile", verifySupabaseToken, upload.single("profileImage"), editAdminProfile);



export default router;