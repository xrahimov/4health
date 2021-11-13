import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import { createServer } from 'http';
import { resolve, join } from 'path';
import { Server } from 'socket.io';
import { readFileSync } from 'fs';
import passport from 'passport';
import path from 'path';
import routes from './routes/index.js';

const app = express();
const __dirname = path.resolve();

// app.use(function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // update to match the domain you will make the request from
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   next();
// });

// Bodyparser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());
import './services/jwtStrategy.js';
import './services/googleStrategy.js';
import './services/localStrategy.js';

const isProduction = process.env.NODE_ENV === 'production';

// DB Config
const dbConnection = isProduction ? process.env.MONGO_URI_PROD : process.env.MONGO_URI_DEV;

// Connect to Mongo
mongoose
  .connect(dbConnection, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('MongoDB Connected...');
  })
  .catch((err) => console.log(err));

// Use Routes
app.use('/', routes);
app.use('/public', express.static(join(__dirname, '../public')));

// Serve static assets if in production
if (isProduction) {
  // Set static folder
  app.use(express.static(join(__dirname, '../../client/build')));

  app.get('*', (req, res) => {
    res.sendFile(resolve(__dirname, '../..', 'client', 'build', 'index.html')); // index is in /server/src so 2 folders up
  });

  const port = process.env.PORT || 80;

  const server = createServer(app).listen(port, () => console.log(`Server started on port ${port}`));

  const io = new Server(server, { cors: { origin: 'http://4health.herokuapp.com', method: ['GET', 'POST'] } });

  app.set('socketio', io);
} else {
  const port = process.env.PORT || 5000;

  const httpsOptions = {
    key: readFileSync(resolve(__dirname, '../server/security/cert.key')),
    cert: readFileSync(resolve(__dirname, '../server/security/cert.pem')),
  };

  const server = createServer(app).listen(port, () => {
    console.log('https server running at ' + port);
  });

  const io = new Server(server, { cors: { origin: 'http://localhost:3000', method: ['GET', 'POST'] } });

  app.set('socketio', io);
}
