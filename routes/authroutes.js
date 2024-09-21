const jwt = require("jsonwebtoken")
const verifyToken = async (token) => {
  const Enc_key =
    "f54dd6c4368d5df7ad649bab3a9e4f3b55fb5d24aa3d8b527158211b873fe901";
  try {
    const data = jwt.verify(token, Enc_key);
    console.log("data", data);
    return { success: true, data: data, err: "" };
  } catch (error) {
    console.log("err", error);
    return { success: false, data: [], err: "" };
  }
};

module.exports = verifyToken;
