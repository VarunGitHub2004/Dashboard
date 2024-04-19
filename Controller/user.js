import User from "../Modals/user.js";


export const getUsers = async (req, res) => {
  const users = await User.find();
  res.send(users);
};
export const getUser = async (req, res) => {
  const id = req.params._id;
  const user = await User.findById(id);
  res.send(user);
};
export const replaceUser = async (req, res) => {
  const id = req.params._id;
  try {
    const replacedUser = await User.findOneAndReplace({ _id: id }, req.body, {
      new: true,
    });
    res.send(replacedUser);
  } catch (err) {
    console.log(err);
  }
};
export const updateUser = async (req, res) => {
  const id = req.params._id;
  try {
    const updatedUser = await User.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
      upsert: true,
    });
    res.send(updatedUser);
  } catch (err) {
    console.log(err);
  }
};
export const deletedUser = async (req, res) => {
  const id = req.params._id;
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    res.send(deletedUser);
  } catch (err) {
    console.log(err);
  }
};
