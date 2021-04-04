const mongoose = require('mongoose');

exports.connect = async () => {
  try {
    const URI = process.env.MONGOURI;
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
    console.log('Established connection to DB');
  } catch (error) {
    console.log('Failed to connect to DB', error);
  }
};
