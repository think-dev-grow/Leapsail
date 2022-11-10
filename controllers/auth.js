const User = require("../models/User");
const handleError = require("../utils/error");

const bcrypt = require("bcrypt");
const crypto = require("crypto");

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  secure: false,
  auth: {
    user: "leapsailafrica@gmail.com",
    pass: "xqrtwkdverhddksi",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const register = async (req, res, next) => {
  try {
    const check = await User.findOne({ email: req.body.email });
    if (check) return next(handleError(404, "User already exist."));

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const user = new User({
      firstname: req.body.firstName,
      lastname: req.body.lastName,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      password: hash,
      emailToken: crypto.randomBytes(64).toString("hex"),
    });

    const data = await user.save();

    const mail = {
      from: ' "Verify your email" <leapsailafrica@gmail.com>',
      to: user.email,
      subject: "Leapsail Email verification",
      html: `<h2>${data.firstname}, Thanks for registering</h2>
        <h4>Please click the link to verify your account</h4>
        <a href="https://leapsail-app.herokuapp.com/leapsail/api/auth/verify-email?token=${data.emailToken}">Verify your Email</a>
       `,
    };

    transporter.sendMail(mail, (err, info) => {
      if (err) {
        console.log(err);
      } else {
        console.log(info);
      }
    });

    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    next(handleError(500, "Oops something went wrong"));
  }
};

const verifyEmail = async (req, res, next) => {
  try {
    const token = req.query.token;

    const user = await User.findOne({ emailToken: token });

    if (!user) {
      return next(handleError(404, "User does not exist."));
    } else {
      user.verified = true;
      user.emailToken = null;

      const verifiedUser = await user.save();
      //   res.send(verifiedUser);
      res.redirect("https://www.google.com/");
    }
  } catch (error) {
    console.log(error);
    next(handleError(500, "Oops, something went wrong"));
  }
};

const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return next(handleError(404, "User does not exist."));

    if (!user.verified) return next(handleError(404, "This email is Invalid."));

    const confirmPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!confirmPassword) return next(handleError(400, "Password incorrect."));

    const { password, ...others } = user._doc;

    res.status(200).json(others);
  } catch (error) {
    console.log(error);
    next(handleError(500, "Oops, something went wrong"));
  }
};

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    next(handleError(500, "Oops, something went wrong"));
  }
};

module.exports = { register, login, verifyEmail, getUsers };
