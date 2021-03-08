import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import postRoutes from './routes/posts.js';
import userRoutes from './routes/user.js';

const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));

// init route
app.use('/posts', postRoutes);
app.use('/user', userRoutes);

// mongodb
const CONNECTION_URL = 'mongodb://127.0.0.1:27017/mern';
const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port :${PORT}`))
  )
  .catch((error) => {
    console.log(error.message);
  });

mongoose.set('useFindAndModify', false);
