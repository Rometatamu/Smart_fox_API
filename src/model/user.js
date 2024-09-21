import mongoose from "mongoose";

const userSchema=mongoose.Schema({
    name: {type: String, required: true, minlength:3, set: (value) => {
        return value.charAt(0).toUpperCase() + value.slice(1);
      },},
    email: {type: String, required: true, validate: {
        validator: function (value) {
          return /\S+@\S+\.\S+/.test(value);
        },  message: "Not correct email",
      },},
    password: {type: String, required: true},
    id: {type: String, required: true},
    photo: {type: String, required:false}
});
export default mongoose.model("User", userSchema);