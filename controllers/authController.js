const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const otpGenerator = require("otp-generator");
const { sendEmail } = require("../utils/mailer");
const { verificationMail } = require("../emailTemplates/verifyMail");
const { tryCatch } = require("../utils/tryCatch");

exports.register = tryCatch(async (req, res) => {
  const { phone, password } = req.body;
  const firstName =
    req.body.firstName.charAt(0).toUpperCase() +
    req.body.firstName.slice(1).toLowerCase();
  const lastName =
    req.body.lastName.charAt(0).toUpperCase() +
    req.body.lastName.slice(1).toLowerCase();
  const email = req.body.email.toLowerCase();

  if (!firstName || !lastName || !email || !password || !phone) {
    throw {
      status: 400,
      message: "Insufficient data provided to create user.",
      data: {
        firstName: firstName || null,
        lastName: lastName || null,
        email: email || null,
        phone: phone || null,
        password: password || null,
      },
    };
  }
  // check if user already exists
  const oldUser = await User.findOne({ email });
  if (oldUser) {
    throw {
      status: 409,
      message: "email already in use",
    };
  }

  // hash password
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);

  const dps = [
    "https://ucarecdn.com/ec6f9f61-d4b7-493b-bbd4-6c3a3b19346a/-/preview/1000x972/",
    "https://ucarecdn.com/aaf23c04-c36f-4366-93e6-bea7dfd71a63/-/preview/300x225/",
    "https://ucarecdn.com/3ab86042-0555-4865-9768-55845000b726/-/preview/736x729/",
    "https://ucarecdn.com/5e6a97d7-5817-46fc-8579-13727d94b8fd/-/preview/246x205/",
    "https://ucarecdn.com/bdfde436-9304-4e3c-a950-9b2d898a2a4b/-/preview/225x225/",
  ];

  // create and save user
  const newUser = new User({
    firstName,
    lastName,
    email,
    phone,
    password: hashedPassword,
    profilePicture: dps[Math.floor(Math.random() * dps.length)],
  });

  // create email verification otp
  const otp = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
  });

  const otpToken = jwt.sign({ otp: otp }, process.env.OTP_TOKEN_SECRET, {
    expiresIn: "30m",
  });
  const accessToken = jwt.sign(
    { id: newUser._id },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "5s",
    }
  );
  const refreshToken = jwt.sign(
    { id: newUser._id },
    process.env.REFRESH_TOKEN_SECRET
  );

  // send verification mail
  await sendEmail(
    "Vaibhav Arts <no-reply@mymuseand.me>",
    email,
    "Verify Your Email Address",
    verificationMail(otp)
  );

  newUser.emailVerificationToken = otpToken;
  newUser.refreshToken.push(refreshToken);
  await newUser.save();

  res.status(200).json({
    message: "User created successfully.",
    accessToken,
    refreshToken,
    userData: {
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      phone: newUser.phone,
      isVerified: newUser.isVerified,
      _id: newUser._id,
      role: newUser.role,
      profilePicture: newUser.profilePicture,
    },
  });
});

exports.login = tryCatch(async (req, res) => {
  const email = req.body.email.toLowerCase();
  const { password } = req.body;

  if (!email || !password) {
    throw {
      status: 400,
      message: "Provide email and password.",
    };
  }

  const user = await User.findOne({
    email: email,
  });
  if (!user) {
    throw {
      status: 403,
      message: "Invalid email and or password.",
    };
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    throw {
      status: 403,
      message: "Invalid email and or password.",
    };
  }

  const accessToken = jwt.sign(
    { id: user._id },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "5m",
    }
  );
  const refreshToken = jwt.sign(
    { id: user._id },
    process.env.REFRESH_TOKEN_SECRET
  );

  await user.updateOne({ $push: { refreshToken: refreshToken } });

  res.status(200).json({
    message: "Login successful.",
    accessToken,
    refreshToken,
    userData: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      isVerified: user.isVerified,
      _id: user._id,
      role: user.role,
      profilePicture: user.profilePicture,
    },
  });
});

exports.renewToken = tryCatch(async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    throw {
      status: 400,
      message: "Provide refresh token.",
    };
  }

  const user = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
  const userInDb = await User.findOne({ _id: user.id });
  if (!userInDb || !userInDb.refreshToken?.includes(refreshToken)) {
    throw {
      status: 403,
      message: "Invalid refresh token.",
    };
  }
  const accessToken = jwt.sign(
    { id: user.id },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "5m",
    }
  );
  res.status(200).json({
    message: "Token renewed successfully.",
    accessToken,
  });
});

exports.sendPasswordResetEmail = tryCatch(async (req, res) => {
  const { email } = req.body;
  if (!email) {
    throw {
      status: 400,
      message: "Provide email.",
    };
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw {
      status: 404,
      message: "User not found.",
    };
  }

  const otp = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
  });
  const otpToken = jwt.sign({ otp: otp }, process.env.OTP_TOKEN_SECRET, {
    expiresIn: "30m",
  });

  await sendEmail(
    "Vaibhav Arts <no-reply@mymuseand.me>",
    email,
    "Password Reset Request",
    verificationMail(otp)
  );

  await user.updateOne({ passwordResetToken: otpToken });
  res.status(200).json({
    message: "Password reset link sent successfully.",
  });
});

// to send email verification link
exports.sendVerificationEmail = tryCatch(async (req, res) => {
  const id = req.id;

  const user = await User.findOne({ _id: id });
  if (!user) {
    throw {
      status: 404,
      message: "User not found.",
    };
  }
  if (user.isVerified) {
    throw {
      status: 400,
      message: "Email already verified.",
    };
  }

  const otp = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
  });
  console.log(otp);
  const otpToken = jwt.sign({ otp: otp }, process.env.OTP_TOKEN_SECRET, {
    expiresIn: "30m",
  });

  await sendEmail(
    "Vaibhav Arts <no-reply@mymuseand.me>",
    user.email,
    "Verify Your Email Address",
    verificationMail(otp)
  );

  await user.updateOne({ emailVerificationToken: otpToken });
  res.status(200).json({
    message: "Verification link sent successfully.",
  });
});

exports.verifyEmail = tryCatch(async (req, res) => {
  const { otp } = req.body;
  const id = req.id;

  const user = await User.findOne({ _id: id });
  if (!user) {
    throw {
      status: 404,
      message: "User not found.",
    };
  }
  if (user.isVerified) {
    throw {
      status: 400,
      message: "Email already verified.",
    };
  }

  const otpToken = user.emailVerificationToken;
  const decoded = jwt.verify(otpToken, process.env.OTP_TOKEN_SECRET);
  if (decoded.otp !== otp) {
    throw {
      status: 403,
      message: "Invalid OTP",
    };
  }

  user.isVerified = true;
  await user.save();
  res.status(200).json({
    message: "Email verified successfully.",
    userData: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      isVerified: user.isVerified,
      _id: user._id,
      role: user.role,
      profilePicture: user.profilePicture,
    },
  });
});
