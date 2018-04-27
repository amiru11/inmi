var express = require('express');
var axios = require('axios')
var models = require('../models');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/people', (req, res) => {
  const {
    sigunguName,
    sidoCode
  } = req.body

  getSigungus(sidoCode)
    .then(result => {
      const promises = []
      result.data.response.body.items.item.forEach(i => {
        if (i.origNm.indexOf(sigunguName) > -1) {
          promises.push(getPeopleByCodes({ sidoCode, sigunguCode: i.origCd }))
        }
      })

      return Promise.all(promises)
    })
    .then(result => {
      const promises = []
      result.forEach(person => {
        const p = person.data.response.body.items.item
        promises.push(
          models.Person.findOrCreate({
            where: p
          })
        )
      })

      return Promise.all(promises)
    })
    .then(result => {
      const people = []
      result.forEach(r => {
        people.push(r[0])
      })
      res.json(people)
    })
    .catch(err => {
      console.error(err)
      res.sendStatus(500)
    })
})

router.post('/mailings', (req, res) => {
  const {
    email,
    personId
  } = req.body

  models.Mailing.create({
    email,
    personId
  })
  .then(() => {
    res.sendStatus(200);
  })
  .catch(err => {
    res.status(500).send(err.message)
  })
})

function getSigungus (sidoCode) {
  return axios
    .get('http://apis.data.go.kr/9710000/NationalAssemblyInfoService/getLocalSearch', {
      params: {
        serviceKey: 'P88jt7FRSdP+0wR8ruS05yNeAGjshkhZzi+y6zStxudzYtyzfUHPTa3TnTO9Ducg2+Um+EEYtBwysiLHJw/9uQ==',
        numberOfRows: 20,
        pageSize: 20,
        pageNo: 1,
        startPage: 1,
        up_orig_cd: sidoCode
      }
    })
}

function getPeopleByCodes ({ sidoCode, sigunguCode } = {}) {
  return axios
    .get('http://apis.data.go.kr/9710000/NationalAssemblyInfoService/getLocalMemberCurrStateList', {
      params: {
        serviceKey: 'P88jt7FRSdP+0wR8ruS05yNeAGjshkhZzi+y6zStxudzYtyzfUHPTa3TnTO9Ducg2+Um+EEYtBwysiLHJw/9uQ==',
        numberOfRows: 20,
        pageSize: 20,
        pageNo: 1,
        startPage: 1,
        up_orig_cd: sidoCode,
        orig_cd: sigunguCode
      }
    })
}

module.exports = router;
