import express from "express";
import {
    GET_ALL_ANSWERS,
    PUT_ANSWER_REACTIONS,
    DELETE_ANSWER_BY_ID,
    GET_FILTERED_ANSWERS_BY_LIKES,
    GET_ANSWERS_BY_USER,
    GET_ANSWER_BY_QUESTION,
    GET_ANSWER_BY_ID,
} from "../controller/answer.js";
import {auth} from "../middlewares/auth.js";

const router=express.Router()

router.get(`/answers`, GET_ALL_ANSWERS);
router.put('/answers/:id/reactions', auth, PUT_ANSWER_REACTIONS);
router.delete('/answer/:questionId/:id', auth, DELETE_ANSWER_BY_ID);
router.get(`/answers/filtered`, GET_FILTERED_ANSWERS_BY_LIKES);
router.get(`/answers/user/:userId`, auth, GET_ANSWERS_BY_USER);
router.get(`/answers/question/:questionId`, auth, GET_ANSWER_BY_QUESTION)
router.get(`/answer/:id`, GET_ANSWER_BY_ID);

export default router;
