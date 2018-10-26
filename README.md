# geocode-app-challenge

Challenge application written in node.js which, given a file with addresses, can output adresses which resolve to "non-partial" results using google geocode api and have a location_type of "ROOFTOP".

# usage
`npm run start` wait for ~62 items to be loaded into mongodb, then navigate to `http://localhost:3000/geocode/addresses/rooftop` to get list of addresses of type `ROOFTOP`.

# What this application does:-
On application start, using "by-line" npm package, the application first reads a .txt file with addresses line-by-line and for each address gets geodata using the google geocode API and stores that data in a mongodb running on mlab.com.

Upon completion of the above process, it starts the node server locally, where using url: `http://localhost:3000/geocode/addresses/rooftop` in the browser, prints geocode json data  for addresses which do not have `partial_match` field and have `ROOFTOP` as their `location_type`.

`*NOTE*`: - I have reduced the number of addresses in the .txt file to 62 from ~3 million, in order to reduce the time it takes to initialize the app :).

# Challenges:- 
- Dealing with large file with ~3 million addresses. 
  - This ment that I had to stop the read stream at a certain point in the code using `.destroy()` or `.close()` which do run on a regular read stream successfully without issues, but `by-line` which uses a read stream internally threw errors when attempting to stop it on it's `data` event. This forced me to not attempt to stop the stream using those functions and simply reduce the numeber of addresses in the txt file to ~400 to keep things faster.

# Bad things in app:- 
- Each time server runs, the app runs the initialization process again, causing the mongo db to be populated with duplicate entries. Could'nt figure out how to make mongodb update the document and create new one if not already exists without attempting to match the `_id` field. Before server restart, I have to clear my db.

- Have to run `npm run start` after file changes. I was initially using nodemon to capture file changes and automatically update the server with latest, however ran into issues with `nodemon + babel` which was taking a long time away from the challenge to resolve.

# Other comments:-
This was mainly 2 days of learning node and how to use mongodb and ~1 day of development. 



