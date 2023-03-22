const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

const filterObj = (obj, ...allowedfields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedfields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users,
    },
  });
});

exports.updateMe = catchAsync(async (req, res, next) => {
  // create error if user posts password
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password updates, plz use /updateMyPassword',
        400
      )
    );
  }

  // filter out unwanted fields
  const filteredBody = filterObj(req.body, 'name', 'email');

  // update the user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });
  res.status(204).json({
    status: 'success',
    data: null
  })
});

exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'err',
    message: 'This route not yet implemented!!',
  });
};

exports.getUser = (req, res) => {
  res.status(500).json({
    status: 'err',
    message: 'This route not yet implemented!!',
  });
};

exports.updateUser = (req, res) => {
  res.status(500).json({
    status: 'err',
    message: 'This route not yet implemented!!',
  });
};

exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: 'err',
    message: 'This route not yet implemented!!',
  });
};
