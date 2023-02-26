const express = require('express');
const router = express.Router();
const passport = require('passport');
require('../utils/passport')(passport)
const { students, JwtSecretKey } = require('../utils/db')

router.post('/add', passport.authenticate('jwt',{session:false}), async (req, res) => {
    const { ydfID, Name, gender } = req.body
    console.log({ ydfID, Name, gender })
    const doc = {
        ydfID,
        Name,
        gender
    }
    const result = await students.insertOne(doc);
    console.log(
        `A student was added with the _id: ${result.insertedId}`,
    );
    res.sendStatus(200)
})

router.get('/', passport.authenticate('jwt',{session:false}), async (req, res) => {
    const data = await students.find().toArray()
    console.log(data)
    res.json(data)
})

router.put('/update', passport.authenticate('jwt',{session:false}), async (req, res) => {
    const { ydfID, notes, Name, FatherName, MotherName, Address, DOB, gender, Doctor, Hospital } = req.body
    console.log('Update: ', { ydfID, notes, Name, FatherName, MotherName, Address, DOB, gender, Doctor, Hospital })
    const filter = { ydfID }
    const options = { upsert: false };
    const updateDoc = {
        $set: {
            notes,
            Name,
            FatherName,
            MotherName,
            Address,
            DOB: new Date(DOB),
            gender,
            Doctor,
            Hospital,
        },
    };
    const result = await students.updateOne(filter, updateDoc, options);
    console.log(result)
    res.sendStatus(200)
})

router.post('/items', async (req, res) => {
    const { ydfID, type, data } = req.body
    let filter;
    let options;
    let updateDoc;
    let result;

    switch (type) {
        case 'insulin':
            filter = { ydfID }
            options = { upsert: false };
            updateDoc = {
                $push: {
                    insulin: {
                        value: data.value,
                        date: new Date(data.date)
                    }
                },
            };
            result = await students.updateOne(filter, updateDoc, options);
            res.sendStatus(200)
            break;
        case 'strip':
            filter = { ydfID }
            options = { upsert: false };
            updateDoc = {
                $push: {
                    strip: {
                        value: data.value,
                        date: new Date(data.date)
                    }
                },
            };
            result = await students.updateOne(filter, updateDoc, options);
            res.sendStatus(200)
            break;
        case 'syringe':
            filter = { ydfID }
            options = { upsert: false };
            updateDoc = {
                $push: {
                    syringe: {
                        value: data.value,
                        date: new Date(data.date)
                    }
                },
            };
            result = await students.updateOne(filter, updateDoc, options);
            res.sendStatus(200)
            break;
        case 'hba1c':
            filter = { ydfID }
            options = { upsert: false };
            updateDoc = {
                $push: {
                    hba1c: {
                        value: data.value,
                        date: new Date(data.date)
                    }
                },
            };
            result = await students.updateOne(filter, updateDoc, options);
            res.sendStatus(200)
            break;
        default: res.sendStatus(404)
    }
})

module.exports = router;