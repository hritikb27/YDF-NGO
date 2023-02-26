const express = require('express');
const router = express.Router();
const { admin, JwtSecretKey } = require('../utils/db')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/add', async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt)
    const doc = { name: req.body.name, email: req.body.email, password };
    const result = await admin.insertOne(doc);
    console.log(
    `A admin was inserted with the _id: ${result.insertedId}`,
    );
    res.sendStatus(200)
})

router.delete('/delete', async (req, res) => {
    const result = await admin.deleteOne(req.body.id);
    console.log(
    `A admin was deleted with the _id: ${result.insertedId}`,
    );
    res.sendStatus(200)
})

router.post('/login', async (req, res) => {
    const result = await admin.findOne({email: req.body.email}, {});
    const match = await bcrypt.compare(req.body.password, result.password)
    let token;
    if(match) {
        let params = {
            email: req.body.email,
            name: req.body.name
        }
        token = await jwt.sign(params, JwtSecretKey, {expiresIn: '8h'});
    }
    res.status(200).json({message: 'token', token})
})

module.exports = router;