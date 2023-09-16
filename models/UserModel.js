import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const adminSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  phoneNumber: String,
  cnic: String,
  email: String,
  password: String,
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  isDeleteable: {
    type: Boolean,
    default: true,
  },
  passwordToken: String,
  passwordTokenExpirationDate: Date,
});

adminSchema.methods.delPassword = function () {
  let obj = this.toObject();
  delete obj.password;
  return obj;
};

adminSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

export default mongoose.model("admin", adminSchema);
