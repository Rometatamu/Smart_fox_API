import express from "express";

import {
    GET_ALL_QUESTIONS,
    GET_QUESTIONS_BY_USER,
    POST_QUESTION,
    DELETE_QUESTION_BY_ID,
    GET_FILTERED_QUESTIONS,
    SUBMIT_ANSWER,
    GET_QUESTION_BY_ID,
} from "../controller/question.js";

import {auth} from "../middlewares/auth.js";
const router=express.Router()


router.get(`/questions`, GET_ALL_QUESTIONS);
router.get(`/question/:id`, GET_QUESTION_BY_ID);
router.get(`/questions/user/:userId`, auth, GET_QUESTIONS_BY_USER);
router.post(`/questions`, auth, POST_QUESTION);
router.delete('/question/:id', auth, DELETE_QUESTION_BY_ID);
router.get(`/questions/filtered`, GET_FILTERED_QUESTIONS);
router.post(`/questions/:id/answers`, auth, SUBMIT_ANSWER)

export default router;
