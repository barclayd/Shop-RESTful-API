# Shop API

RESTful API for a shop build using Node.js connecting to MongoDB held in Atlas

### Features

- [x] Routes for orders, products and user
- [x] Error handling
- [x] CORS handling
- [x] Retrieves data from MongoDB stored in Atlas
- [x] Mongoose validation
- [x] Queries populated with Mongoose
- [x] Supports uploading an image
- [x] User sign up with validation
- [x] User login as part of stateless authentication
- [x] JWT signing and exchange upon successful login
- [x] Protected routes requiring JWT provided in Headers - Authorization
- [x] MVC approach with controllers and models

### How to Run

```
$ git clone https://github.com/barclayd/Shop-RESTful-API.git
$ cd Shop-RESETful-API
$ npm start
```
The server will now be running, by default, at ```localhost:3000```
##### Set up .env

Node server requires .env file with the following variables:
```
APP_URL=localhost:<PORT>
PORT=3000
MONGO_ATLAS_PW=<MONGO_ATLAS_PASSWORD>
JWT_KEY=<CUSTOM_TOKEN_KEY>
```
Ensure that the the PORT in APP_URL and PORT match.
Set enter your Mongo Atlas Password into the MONGO_ATLAS_PW variable.
Enter your own custom string to JWT_KEY - this can be anything you wish.

### Future Improvements
* User roles
* Filter orders by user
* Frontend for API
