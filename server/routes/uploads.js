import express from 'express';
import { upload } from "../controller/uploadController.js";


const handleUploadsRouter = express.Router();
// POST /api/upload
handleUploadsRouter.post("/upload-logo", upload.single("logo"));


export default handleUploadsRouter ;