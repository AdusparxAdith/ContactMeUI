module.exports = {
  DEVELOPMENT: {
    PORT: 6000,
    MONGOURI: 'mongodb://localhost:27017/formsy'
  },
  PRODUCTION: {
    PORT: 5000,
    MONGOURI:
      'mongodb+srv://adusparx:adusparx@123@clusterlord.gd09l.mongodb.net/formsy?retryWrites=true&w=majority'
  }
};
