import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: String,
    password: String,
    status: Boolean,
    totalTime: Number,
    studyPartner: mongoose.Schema.Types.ObjectId, 
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.Status || mongoose.model("User", userSchema);

export default User;