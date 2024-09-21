import mongoose from "mongoose";

const questionSchema=mongoose.Schema({
    question_text: {type: String, required: true, min:10},
    date: {type: Date, required: true, default: Date.now},
    userId:{type:String, required:true},
    id: {type: String, required: true},
    answered: {type: Boolean, default: false}
});
export default mongoose.model("Question", questionSchema);