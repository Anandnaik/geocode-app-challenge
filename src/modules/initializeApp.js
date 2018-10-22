import fs from 'fs';
import byLine from 'byline';
import mongoose from 'mongoose';
import googleMaps from "@google/maps";
import config from '../../config.json';
import parseAddressLine from '../helpers/parseAddressLine';
import GeocodeModel from '../mongo/models/geocode';

/**
 * Funciton which does the following:
 * 1) Creates read streams for reading .txt file with addresses line-by-line
 * 2) Connects to mongodb at mlab.com
 * 3) For each address in .txt file, gets geocode data and populates mongo db with that data
 * 4) Returns the "per-line" stream to allow listening for end of initialization operations.
 */
export default () => {
  const ReadStream = fs.createReadStream('./addresses.txt', { encoding: 'utf8' });

  // setup geocoder to geocode addresses
  const geocoder = googleMaps.createClient({
    key: config.geoCodeApiKey,
    Promise,
  });

  // connect to mongo db from mlab.com
  mongoose.connect(config.mongoDbUrl);

  const addressFile = byLine.createStream(ReadStream);

  addressFile.on('data', (line) => {
    console.log('parsed line: ', parseAddressLine(line));
    const address = parseAddressLine(line);
    // get geocode data
    geocoder.geocode({ address })
      .asPromise()
      .then((res) => {
        const data = res.json.results[0];
        // saves data into database
        GeocodeModel(data).save();
      }).catch((err) => {
        console.log(err);
      });
    addressFile.pause();
    setTimeout(() => {
      addressFile.resume();
    }, 100);
  }); 

  return addressFile;

}
