import mongoose from 'mongoose';
import config from '../config.json';
import assert from 'assert';
import initialize from '../src/modules/initializeApp';
import TestModel from '../src/mongo/models/testModel';

describe('App initialization test', () => {
  before((done) => {
    mongoose.connect(config.mongoDbUrl);
    done();
  });

  it('Connects successfully to database', (done) => {
    const dbConnecton = mongoose.connection;
    dbConnecton.on('error', (err) => { throw err });
    dbConnecton.once('open', () => { done() });
  });

  it('Creates a collection in database named `tests`', (done) => {
    const db = mongoose.connection.db;
    const readStream = initialize('./test.txt', TestModel);
    readStream.on('msaved', () => {
      db.listCollections().toArray((err, collections) => {
        const testCollectionExists = collections.some(collection => {
          return collection.name === 'tests';
        });
        assert(testCollectionExists, true);
        done();
      });
    });
  });

  after((done) => {
    mongoose.connect(config.mongoDbUrl);
    const db = mongoose.connection.db;
    db.dropCollection('tests');
    done();
  });

});
