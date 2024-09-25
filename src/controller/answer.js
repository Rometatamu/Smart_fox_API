import {v4 as uuidv4} from "uuid";
import AnswerModel from "../model/answer.js";
import QuestionModel from "../model/question.js";
import updateReaction from "../utils/reactionUtils.js";

const GET_ALL_ANSWERS= async (req, res)=>{
    try{
        const answers=await AnswerModel.find();
        res.status(200).json({answers: answers});
    } catch(err){
      console.log(err);
      return res.status(500).json({mesage:`Server error`});
    }
};
const DELETE_ANSWER_BY_ID = async (req, res)=>{
    try{ 
        const questionId=req.params.questionId;
        const answerId = req.params.id;

        const response =await AnswerModel.findOneAndDelete({id: answerId});
        if(!response){
            return res.status(404).json({message: `The answer does not exist`});
           }
        if (response.userId !== req.body.userId){
            return res.status(403).json({ message: "You can delete only answer that belongs to you."});
        }
        const question = await QuestionModel.findOne({id:questionId});
        if (question) {
            question.answered = false;
            await question.save();
        }
        
        return res.status(200).json({response: `The answer was deleted`, answer: response})
    
      } catch(err){
          console.log(err);
          return res.status(500).json({message: `Server error`});
      }
};
const GET_FILTERED_ANSWERS_BY_LIKES = async function(req, res) {
    try {
        const { filterBy } = req.query;
        const filter = {};

        if (filterBy === 'likes') {
            filter.gained_likes_number = { $gte: 0 };  
        }
        const sortedAnswers = await AnswerModel.find(filter).sort({"gained_likes_number": -1});

        res.status(200).json({ sortedAnswers });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: `Server error` });
    }
};
const PUT_ANSWER_REACTIONS = async function (req, res) {
  try {
    const id = req.params.id; 
    const { reactionType } = req.body; 
    const userId = req.body.userId;

    const answer = await AnswerModel.findOne({ id: id});
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    } 
    if (!answer) {
      return res.status(404).json({ message: 'The answer does not exist' });
    }

    updateReaction(reactionType, answer, userId);
    
    await answer.save();
    
    return res.status(200).json({ message: 'Your reaction was updated', answer, userId });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};
const GET_ANSWERS_BY_USER= async (req, res)=>{
    try{
        const answers=await AnswerModel.find({userId: req.params.userId});
        res.status(200).json({answers: answers});
    } catch(err){
      console.log(err);
      return res.status(500).json({mesage:`Server error`});
    }
};
const GET_ANSWER_BY_QUESTION = async (req, res) => {
  try {
    const answer = await AnswerModel.find({ questionId: req.params.questionId });
    
    return res.status(200).json({ answer: answer });
    
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Server error' });
  }
};


export {GET_ALL_ANSWERS,  DELETE_ANSWER_BY_ID, GET_FILTERED_ANSWERS_BY_LIKES, PUT_ANSWER_REACTIONS, GET_ANSWERS_BY_USER, GET_ANSWER_BY_QUESTION};
