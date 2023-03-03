const { MongoClient } = require("mongodb");
require('dotenv').config();

const uri = process.env.DATABASE_URL;
const client = new MongoClient(uri);
const database = client.db(process.env.COLLECTION);
const students = database.collection('students');
const admin = database.collection('admins');
const JwtSecretKey = process.env.JWT_SECRET;

module.exports = { students, admin, JwtSecretKey }