const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

router.post('/add', async (req, res) => {
    const { ydfID, Name, gender } = req.body
    await prisma.student.create({
        data: {
            ydfID,
            Name,
            gender,
        },
    })
    res.sendStatus(200)
})

router.get('/', async (req, res) => {
    const data = await prisma.student.findMany()
    res.json(data)
})

router.put('/profile', async (req, res) => {
    const { ydfID, notes, Name, FatherName, MotherName, Address, DOB, gender, Doctor, Hospital } = req.body

    await prisma.student.update({
        where: {
            ydfID
        },
        data: {
            notes,
            Name,
            FatherName,
            MotherName,
            Address,
            DOB,
            gender,
            Doctor,
            Hospital
        },
    });
    res.sendStatus(200)
})

router.post('/items', async (req, res) => {
    const { ydfID, type, data } = req.body

    switch (type) {
        case 'insulin': await prisma.insulin.create({
                data: {
                    value: data.value,
                    date: new Date(data.date),
                    student: { connect: { ydfID } }
                }
            });
            res.sendStatus(200)
            break;
        case 'strip': await prisma.strip.create({
                data: {
                    value: data.value,
                    date: new Date(data.date),
                    student: { connect: { ydfID } }
                }
            });
            res.sendStatus(200)
            break;
        case 'syringe': await prisma.syringe.create({
                data: {
                    value: data.value,
                    date: new Date(data.date),
                    student: { connect: { ydfID } }
                }
            });
            res.sendStatus(200)
            break;
        case 'hba1c':
            await prisma.hBA1C.create({
                data: {
                    value: data.value,
                    date: new Date(data.date),
                    student: { connect: { ydfID } }
                }
            })
            res.sendStatus(200)
            break;
        default: res.sendStatus(404)
    }
})

router.delete('/items', async (req, res) => {
    const { ydfID, type, data } = req.body

    switch (type) {
        case 'insulin': await prisma.insulin.delete({
                where: {
                    ydfID,
                },
            })
            res.sendStatus(200)
            break;
        case 'strip': await prisma.strip.delete({
                where: {
                    ydfID,
                },
            })
            res.sendStatus(200)
            break;
        case 'syringe': await prisma.syringe.delete({
                where: {
                    ydfID,
                },
            })
            res.sendStatus(200)
            break;
        case 'hba1c': await prisma.hBA1C.delete({
                where: {
                    ydfID,
                },
            })
            res.sendStatus(200)
            break;
        default: res.sendStatus(404)
    }
})

router.put('/types', async (req, res) => {
    const { ydfID, type, data } = req.body

    switch (type) {
        case 'insulin': await prisma.student.update({
            where: {
                ydfID
            },
            data: {
                insulinType: data
            },
            });
            res.sendStatus(200)
            break;
        case 'strip': await prisma.student.update({
            where: {
                ydfID
            },
            data: {
                stripType: data
            },
            });
            res.sendStatus(200)
            break;
        case 'syringe': await prisma.student.update({
            where: {
                ydfID
            },
            data: {
                syringeType: data
            },
            });
            res.sendStatus(200)
            break;
        default: res.sendStatus(404)
    }
})

module.exports = router;