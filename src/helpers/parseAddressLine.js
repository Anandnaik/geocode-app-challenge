import config from '../../config.json';

/**
 * Converts the address chunk from stream to a usable string for passing to google geocode api url
 */
export default (addressLine) => {
  return Object.values(config.addressParserKey).reduce(
    (accumulated, current) => {
      const fromChar = accumulated.fromChar;
      const toChar = fromChar + current;
      const value = addressLine.substring(accumulated.fromChar, toChar).trim().replace(/ /g, "+").replace(/#/g, '');
      const accAddress = accumulated.address;
      return {
        address: value ? accAddress ? `${accAddress}+${value}` : value : accAddress,
        fromChar: toChar
      }
    },
    {
      address: '',
      fromChar: 0
    }
  ).address;
}