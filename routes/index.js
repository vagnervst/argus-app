var express = require('express');
var router = express.Router();
var axios = require('axios');

const apiUrl = process.env.API_URL;

router.post('/supporter/login', async function(req, res, next) {
  const { username, password } = req.body;

  try {
    let request = await axios.post(`${apiUrl}/supporters/login`, {
      user: username,
      password: password
    }).then( res => res.data );

    res.cookie('user', request._id);
    res.cookie('is_active', request.is_active);

    res.send(request);
  } catch(e) {
    return res.status(403).send('User not found');
  }
});

router.get('/supporter/login', async (req, res, next) => {
  const { user } = req.cookies;

  if( !user ) {
    return res.status(401).send('Not logged in');
  }

  try {
    let supporter = await axios.get(`${apiUrl}/supporters/${user}`).then( res => res.data )

    const loggedUser = {
      id: supporter._id,
      is_active: supporter.is_active
    };

    return res.send(loggedUser);
  } catch(e) {
    return res.status(500).send('There was an error getting supporter information.');
  }
});

router.put('/supporter/update', async (req, res) => {
  const loggedUser = req.cookies.user || null;

  if( !loggedUser ) {
    return res.status(403).send('Not logged in');
  }

  try {
    await axios.put(`${apiUrl}/supporters/${loggedUser}`, req.body);
    return res.send('ok');
  } catch(e) {
    return res.status(500).send(`Request failed: ${e}`);
  }
});

router.post('/issue/assign', async function(req, res, next) {
  const { id: issueId } = req.body;

  const loggedUser = req.cookies.user.id || null;

  if( loggedUser ) {
    let response = await axios.put(`${apiUrl}/issues/${issueId}/assign`, {
      supporter: loggedUser
    });

    res.json(response.data);
    return;
  }

  res.send('Not logged in');
});

module.exports = router;
