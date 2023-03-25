const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory = require('./handlerFactory');

const filterObj = (obj, ...allowedfields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedfields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};


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
    data: null,
  });
});

exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not defined! please use /signup instead',
  });
};

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
}

exports.getAllUsers = factory.getAll(User);
exports.getUser = factory.getOne(User);
// Do NOT update passwords with this!
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);
