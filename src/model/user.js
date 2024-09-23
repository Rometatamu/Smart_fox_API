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
    photo: {type: String, default:"https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3383.jpg",
      set: (value) => {
        return value === "" ? undefined : value;
      },
    },
  });
export default mongoose.model("User", userSchema);