const express = require('express');
const path = require('path');
const db = require('./db/db');

const { Forms } = require('./models/forms');

const app = express();

app.use(express.static(path.resolve(__dirname, '../client/build')));
app.use('/api/forms', require('./routes/forms'));

const PORT = process.env.PORT || 5000;

app.get('*', (_, res) => {
  const URL = path.resolve(__dirname, '../client/build', 'index.html');
  return res.sendFile(URL);
});

app.listen(PORT, async () => {
  try {
    await db.connect();
    console.log(`Listening on PORT ${PORT}`);
  } catch (error) {
    console.log(error);
  }
});
