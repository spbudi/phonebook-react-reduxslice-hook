var express = require('express');
var router = express.Router();
var models = require('../models');
var {Response} = require('../helpers/util');
const { Op } = require('sequelize');


router.get('/', async function (req, res, next) {
  try {
    const { name, phone } = req.query
    // console.log(name, phone);

    const page = parseInt(req.query.page) || 1
    const limit = 3
    const offset = (page - 1) * limit

    // const total = await models.User.count()
    if (name && phone) {
      const { count, rows } = await models.User.findAndCountAll({
        where: {
          [Op.and]: [
            {
              name: {
                [Op.iLike]: '%' + name + '%'
              }
            },
            {
              phone: {
                [Op.iLike]: '%' + phone + '%'
              }
            }
          ]
        },
        limit: limit,
        offset: offset
      })

      const totalPage = Math.ceil(count / limit)
      res.json(new Response({ result: rows, page: page, totalPage: totalPage, offset }))
    } else if (name) {
      const {count, rows } = await models.User.findAndCountAll({
        where: {
          name: {
            [Op.iLike]: '%' + name + '%'
          }
        },
        limit: limit,
        offset: offset
      })
      const totalPage = Math.ceil(count / limit)
      res.json(new Response({ result: rows, page: page, totalPage: totalPage, offset }))
    } else if (phone) {
      const {count, rows} = await models.User.findAndCountAll({
        where: {
          phone: {
            [Op.iLike]: '%' + phone + '%'
          }
        },
        limit: limit,
        offset: offset
      })
      const totalPage = Math.ceil(count / limit)
      res.json(new Response({ result: getUser, page: page, totalPage: totalPage, offset }))
    } else {
      const {count, rows } = await models.User.findAndCountAll({
        order: [
          ["id", "ASC"]
        ],
        limit: limit,
        offset: offset
      })
      const totalPage = Math.ceil(count / limit)
      res.json(new Response({ result: rows, page: page, totalPage: totalPage, offset }))
    }
  } catch (err) {
    res.status(500).json(new Response(err, false))
  }
});

router.post('/', async function (req, res, next) {
  try {
    const user = await models.User.create(req.body)
    res.json(new Response(user))
  } catch (err) {
    res.status(500).json(new Response(err, false))
  }
});

router.put('/:id', async function (req, res, next) {
  try {
    const user = await models.User.update(req.body, {
      where: {
        id: req.params.id
      },
      returning: true,
      plain: true
    })
    res.json(new Response(user[1]))
  } catch (err) {
    res.status(500).json(new Response(err, false))
  }
});

router.delete('/:id', async function (req, res, next) {
  try {
    const user = await models.User.destroy({
      where: {
        id: req.params.id
      }
    })
    res.json(new Response(user))
  } catch (err) {
    res.status(500).json(new Response(err, false))
  }
});

module.exports = router;
