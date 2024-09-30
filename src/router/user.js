import express from "express";
import {
    GET_ALL_USERS, 
    SIGN_UP, 
    LOGIN, 
    VALIDATE_LOGIN,
} from "../controller/user.js";

const router=express.Router()

router.post("/signup", SIGN_UP);
router.post("/login", LOGIN);
router.get("/users", GET_ALL_USERS);
router.get("/login/validate", VALIDATE_LOGIN);

export default router;