import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: String,
    password: String,
    status: Boolean,
    totalTime: Number,
    studyPartner: { type: Schema.Types.ObjectId, ref: 'User' }, //Could replace with groups instead 
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.Status || mongoose.model("User", userSchema);

export default User;