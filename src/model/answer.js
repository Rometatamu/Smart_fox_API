import mongoose from "mongoose";

const answerSchema=mongoose.Schema({
    answer_text: {type: String, required: true, min:10},
    date: {type: Date, required: true, default: Date.now},
    userId:{type:String, required:true},
    id: {type: String, required: true},
    gained_likes_number: {type: Number, default: 0},
    gained_dislikes_number: {type: Number, default: 0},
    questionId: {type:String, required:true},
    likedBy: [{ type: String }], 
    dislikedBy: [{ type: String }] 
});
export default mongoose.model("Answer", answerSchema);