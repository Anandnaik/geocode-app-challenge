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
  GeocodeModel.find({ partial_match: { $exists: false }, 'geometry.location_type': { $eq: 'ROOFTOP'} }, (error, geocodes) => {
    if (error) {
      return res.status(500).send("There was a problem getting geocodes.");
    }
    res.status(200).send(geocodes);
  });
});

export default router;
