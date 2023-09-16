import User from "../models/UserModel.js";
import { StatusCodes } from "http-status-codes";
import { comparePassword } from "../utils/passwordUtils.js";
import {
  UNAUTHENTICATED_ERROR,
  UNAUTHORIZED_ERROR,
} from "../errors/CustomErrors.js";

export const getCurrentUser = async (req, res) => {
  const adminUser = await User.findOne({ _id: req.user.userId });
  const user = adminUser.delPassword();
  res.status(StatusCodes.OK).json({ user });
};
export const updatePersonalInfo = async (req, res) => {
  let newUser = { ...req.body };
  await User.findByIdAndUpdate(req.user.userId, newUser);
  res.status(StatusCodes.OK).json({ msg: "user updated" });
};

export const updatePassword = async (req, res) => {
  const currentUser = await User.findOne({ _id: req.user.userId });

  const { currentPassword, newPassword } = req.body;
  const isPasswordCorrect = await comparePassword(
    currentPassword,
    currentUser.password
  );
  if (!isPasswordCorrect)
    throw new UNAUTHENTICATED_ERROR("invalid existing password");

  currentUser.password = newPassword;
  await currentUser.save();

  res.status(StatusCodes.OK).json({ msg: "Password changed successfully" });
};

export const getAllUsers = async (req, res) => {
  const users = await User.find({ role: "user" });
  const filteredUsers = users.map((user) => user.delPassword());
  res.status(StatusCodes.OK).json({ filteredUsers });
};

export const createUser = async (req, res) => {
  await User.create(req.body);
  res.status(StatusCodes.CREATED).json({ msg: "user created" });
};
export const updateUser = async (req, res) => {
  const { id } = req.params;
  await User.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  res.status(StatusCodes.OK).json({ msg: "user updated" });
};
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  const userToDelete = await User.findOne({ _id: id });
  if (!userToDelete.isDeleteable) {
    throw new UNAUTHORIZED_ERROR("not authorized to delete this user");
  }
  await User.findByIdAndDelete(id);
  res.status(StatusCodes.OK).json({ msg: "user deleted" });
};

export const getSingleUser = async (req, res) => {
  const { id } = req.params;
  const singleUser = await User.findOne({ _id: id });
  const user = singleUser.delPassword();

  res.status(StatusCodes.OK).json({ user });
};
