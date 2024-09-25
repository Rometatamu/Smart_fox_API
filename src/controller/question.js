import {v4 as uuidv4} from "uuid";
import QuestionModel from "../model/question.js";
import AnswerModel from "../model/answer.js";

const GET_ALL_QUESTIONS= async (req, res)=>{
    try{
        const questions=await QuestionModel.find().sort({"date": -1});
        res.status(200).json({questions: questions});
    } catch(err){
      console.log(err);
      return res.status(500).json({message:`Server error`});
    }
};
const GET_QUESTIONS_BY_USER= async (req, res)=>{
    try{
        const questions=await QuestionModel.find({userId: req.params.userId});
        res.status(200).json({questions: questions});
    } catch(err){
      console.log(err);
      return res.status(500).json({message:`Server error`});
    }
};
const GET_QUESTION_BY_ID = async (req, res)=>{
    try{
       const id=req.params.id;
       const question=await QuestionModel.findOne({id:id});
        if(!question){
         return res.status(404).json({message: `The question does not exist`});
        }
        return res.status(200).json({response: `status`, question: question,})
     } catch(err){
          console.log(err);
          return res.status(500).json({message: `Server error`});
     }
};
const POST_QUESTION = async (req, res)=>{
    try{
    const question= new QuestionModel({
        question_text: req.body.question_text,
        date: req.body.date,
        answered:req.body.answered,
        userId: req.body.userId,
        id: uuidv4(),
    });
    await question.save();
    return res.status(201).json({message: "A question was provided successfully.", question: question});
   } catch (err){
    console.log(err);
    return res.status(500).json({message: "Server error"});
   };
};
const DELETE_QUESTION_BY_ID = async (req, res) => {
    try {
        const question = await QuestionModel.findOne({ id: req.params.id });
        if (!question) {
            return res.status(404).json({ message: `The question does not exist` });
        }
        if (question.answered) {
            return res.status(403).json({ message: "You cannot delete a question that has already been answered." });
        }
        if (question.userId !== req.body.userId) {
            return res.status(403).json({ message: "You can delete only questions that belong to you." });
        }
        const response = await QuestionModel.findOneAndDelete({ id: req.params.id });

        return res.status(200).json({ message: `The question was deleted`, question: response });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: `Server error` });
    }
};

const GET_FILTERED_QUESTIONS= async (req, res)=>{
    try{
        const { answered } = req.query;
        const filter = {};
        
        if (answered === 'true') {
            filter.answered = true;
        } else if (answered === 'false') {
            filter.answered = false;
        }
        const questions=await QuestionModel.find(filter).sort({"date": -1});
        res.status(200).json({questions: questions});
    } catch(err){
      console.log(err);
      return res.status(500).json({message:`Server error`});
    }
};
const SUBMIT_ANSWER = async (req, res) => {
    try {
        const questionId=req.params.id
       
        const question = await QuestionModel.findOne({id:questionId });

        if (!question) {
            return res.status(404).json({ message: 'The question not exist' });
        }

        if (question.answered) {
            return res.status(400).json({ message: 'This question already answered' });
        }

        const newAnswer = new AnswerModel({
            answer_text: req.body.answer_text,
            date: req.body.date,
            userId: req.body.userId,
            gained_likes_number: req.body.gained_likes_number,
            gained_dislikes_number: req.body.gained_dislikes_number,
            questionId:questionId,
            likedBy: req.body.likedBy, 
            dislikedBy: req.body.dislikedBy,
            id: uuidv4(), 
        });

        await newAnswer.save();

        question.answered = true;
        await question.save(); 

        res.status(201).json({
            message: "An answer was provided successfully.",
            answer: newAnswer,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};


    
export {GET_ALL_QUESTIONS, GET_QUESTIONS_BY_USER, POST_QUESTION, DELETE_QUESTION_BY_ID, GET_FILTERED_QUESTIONS, SUBMIT_ANSWER, GET_QUESTION_BY_ID };
