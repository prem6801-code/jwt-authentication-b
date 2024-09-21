const login = require("../dbConfigs/models");
const express = require("express");
const router = express.Router();
const Enc_key =
  "f54dd6c4368d5df7ad649bab3a9e4f3b55fb5d24aa3d8b527158211b873fe901";
const jwt = require("jsonwebtoken");
const authenticateToken = require("../middlewares/authmiddleware");

const loginController = async (req, res) => {
  const { email, password } = req.body;
  try {
    const loginUser = await login.findOne({ email: email, password: password });
    console.log("logi", loginUser);
    if (loginUser === null) {
      res.send({
        status: 401,
        data: {},
        err: "User Not Found",
      });
    } else {
      res
        .cookie(
          "token",
          jwt.sign({ email: loginUser.email }, Enc_key, { expiresIn: "10m" })
        )
        .send({
          status: 200,
          data: loginUser,
          err: "",
        });
    }
  } catch (error) {
    console.log("error");
  }
};

const signupController = async (req, res) => {
  const { email, password, name } = req.body;
  try {
    const result = await login.create({ name, email, password });
    console.log("Successfull sign up");
  } catch (error) {
    console.log("error");
  }
};

const signOut = async (req, res) => {
  res.cookie("token", "").send({
    status: 200,
    data: "Sign Out Successfully",
    err: "",
  });
};

const checkAuthentication = async (req, res) => {
  res.send({
    status: 200,
    data: "User Authenticated",
    err: "",
  });
};

router.post("/userLogin", loginController);
router.post("/userSignIn", signupController);
router.post("/authenticate", authenticateToken, checkAuthentication);
router.post("/userSignout", signOut);

module.exports = router;
