const express = require('express');
const helmet = require('helmet');

const cors = require('cors');

// Routers
const actionRouter = require('./routes/actionRouter.js');
const projectRouter = require('./routes/projectRouter.js');

const server = express();

//middleware
function logger(req, res, next) {
  console.log('Logging for:', req.body);
  console.log('On', req.url);

  next();
}
//server.uses
server.use(express.json());
server.use(cors());
server.use(helmet());
server.use(logger);

server.use('/api/actions', actionRouter);
server.use('/api/projects', projectRouter);

const port = 5010;
server.listen(port, () => console.log('API runnning on port 5010'));
