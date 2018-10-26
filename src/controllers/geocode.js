import express from 'express';
import bodyParser from 'body-parser';
import GeocodeModel from '../mongo/models/geocode';

/**
 * Controller for handeling all geocode related api requests
 */
const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get('/addresses/rooftop', (req, res) => {
  GeocodeModel.find({ partial_match: { $exists: false }, 'geometry.location_type': { $eq: 'ROOFTOP' } }).distinct('formatted_address', (error, data) => {
    if (error) {
      return res.status(500).send("There was a problem getting rooftop addresses.");
    }
    res.status(200).send(JSON.stringify(data));
  })
});

export default router;
