// Imports express
const express = require('express');

// Imports routes
const routes = require('./routes');

// Imports sequelize
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// Connection to DB and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`App listening on port ${PORT}! Click to open: http://localhost:${PORT}`));
});