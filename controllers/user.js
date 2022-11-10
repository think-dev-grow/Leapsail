const User = require("../models/User.js");
const handleError = require("../utils/error");

const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: "leapsailafrica@gmail.com",
    pass: "xqrtwkdverhddksi",
  },
});

const forgetPassword = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) return next(handleError(404, "This email is Invalid."));

    if (user) {
      const link = `https://leapsail-app.herokuapp.com/leapsail/api/user/reset-password/${user._id}`;

      const mail = {
        from: "leapsailafrica@gmail.com",
        to: user.email,
        subject: "Reset Password",
        html: `<p> Hi ${user.firstname} , Click the link to reset Password <a href=${link}>Reset Password</a> </p>`,
      };

      transporter.sendMail(mail, function (err, info) {
        if (err) {
          console.log(err);
        } else {
          console.log("Mail has been sent ", info.response);
        }
      });

      res.status(200).json("Check your email and reset password");
    } else {
      next(handleError(403, "This user does not exist"));
    }
  } catch (error) {
    console.log(error);
    next(handleError(500, "Oops, something went wrong"));
  }
};

const resetPassword = async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findOne({ _id: id });
  if (!user) return next(handleError(404, "User does not exist."));

  try {
    res.redirect(`https://leapsail-web.netlify.app/reset-password/${id}`);
  } catch (error) {
    console.log(error);
    next(handleError(500, "Oops, something went wrong"));
  }
};

const resetPassword2 = async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findOne({ _id: id });
  if (!user) return next(handleError(404, "User does not exist."));

  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const userData = await User.findByIdAndUpdate(
      { _id: id },
      { $set: { password: hash } }
    );
    res
      .status(200)
      .json({ msg: "User password has been rest", data: userData });
  } catch (error) {
    console.log(error);
    next(handleError(500, "Oops, something went wrong"));
  }
};

module.exports = { forgetPassword, resetPassword, resetPassword2 };
