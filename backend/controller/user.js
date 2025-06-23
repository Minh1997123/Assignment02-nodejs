const userModel = require("../model/user.js");

// post => login
const postLogin = async function (req, res, next) {
  try {
    const reqData = req.body;
    // tim xem co tai khoa n trong database ko
    const user = await userModel.findOne({
      email: reqData.email,
    });
    // neu ko co
    if (!user) {
      return res.status(401).json({ message: "Sai tài khoản hoặc mật khẩu" });
    }
    // neu co thi so sanh pass
    if (user.password === reqData.password) {
      return res.status(200).json({ isLogin: true, email: user.email });
    }
    // neu sai pass
    return res.status(401).json({ message: "Sai tài khoản hoặc mật khẩu" });
  } catch (err) {
    return res.status(404).json("err");
  }
};

// post => signup
const postSignUp = async function (req, res, next) {
  try {
    // lay data gui len
    const reqData = req.body;
    //   tim xem email da ton tai chua
    const user = await userModel.findOne({
      email: reqData.email,
    });
    // neu da co user roi
    if (user) {
      return res.status(401).json({
        message: "Email đã tồn tại",
      });
    }
    // neu chua co
    // tao user moi
    const newUser = await userModel.create({
      email: reqData.email,
      password: reqData.password,
    });
    //   luu user moi vao database
    const userSave = await newUser.save();
    //   sau khi luu vao database
    return res.status(200).json(userSave.email);
  } catch (err) {
    //   bat loi
    return res.status(404).json(err);
  }
};
module.exports = {
  postLogin,
  postSignUp,
};
