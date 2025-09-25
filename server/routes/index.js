import express from "express";
import { ExampleFunction } from "../controller/index.js";
const router = express.Router();
router.get('/example', ExampleFunction);
export default router;