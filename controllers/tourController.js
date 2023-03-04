const Tour = require('./../models/tourModel');

// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
// );

exports.getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'success',
    // results: tours.length,
    // requestedAt: req.requestTime,
    // data: {
    //   tours,
    // },
  });
};

exports.createTour = (req, res) => {
  // console.log(req.body);
  res.status(201).json({
    status: 'success',
    // data: {
    // tour: newTour,
    // },
  });
};

exports.getTour = (req, res) => {
  // console.log(req.params.id);
  const id = req.params.id * 1;
  // const tour = tours.find((el) => el.id === id);

  // if (id > tours.length) {
  //   if (!tour) {
  //     return res.status(404).json({ status: 'fail', message: 'Invalid Id!' });
  //   }
  res.status(200).json({
    status: 'success',
    // data: {
    //   tour,
    // },
  });
};

exports.updateTour = (req, res) => {
  //   if (req.params.id * 1 > tours.length) {
  //     return res.status(404).json({ status: 'fail', message: 'Invalid Id!' });
  //   }
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here>',
    },
  });
};

exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null,
  });
};

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res
      .status(400)
      .json({ status: 'fail', message: 'Missing name or price!!' });
  }
  next();
};
