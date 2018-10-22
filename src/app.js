import initializeApp from './modules/initializeApp';
import express from 'express';
import geoCodeController from './controllers/geocode';

const app = express();

app.use('/geocodes', geoCodeController);

// reads .txt file line by line and populates mongodb with geocode data 
// retrivied from google geocode api
const FileLineReadStream = initializeApp();

FileLineReadStream.on("end", () => {
  console.log('database populated with gecode data, starting server');
  const port = 3000;
  app.listen(port, () => {
    console.log('app server listening on port:- ', port);
  });
});