# geocode-app-challenge

Challenge application which, given a file with addresses, can output adresses which resolve to "non-partial" results using google geocode api and have a location_type of "ROOFTOP".

# Challenge criteria

- Load and parse the addresses.tar.gz based on the positional key below.
- Geocode the addresses by using the Google Geocode API
- Only output addresses that have a single non-partial results and have a geocode of ROOFTOP quality

Positional Key:
HOUSE NUMBER: 30
STREET DIRECTION PREFIX: 2
STREET NAME: 40
STREET SUFFIX: 4
STREET DIRECTION SUFFIX: 2
UNIT DESCRIPTOR: 10
UNIT NUMBER: 6
CITY: 30
STATE: 2
ZIP: 12

