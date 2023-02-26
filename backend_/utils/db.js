const { MongoClient } = require("mongodb");

const uri =
  "mongodb+srv://yogdhyaanfoundation:*yogdhyaan123*@yogdhyaancrud.6med7w4.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);
const database = client.db('yogdhyaan');
const students = database.collection('students');
const admin = database.collection('admins');
const JwtSecretKey = 'somesecretkey';

module.exports = { students, admin, JwtSecretKey }