var express = require('express');
var router = express.Router();
var axios = require('axios');
var octokit = require('@octokit/rest')();

octokit.authenticate({
  type: 'token',
  token: process.env.GITHUB_TOKEN
})

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

    return res.send(supporter);
  } catch(e) {
    return res.status(500).send('There was an error getting supporter information.');
  }
});

router.get('/supporters', async (req, res) => {

  try {
    let supporters = await axios.get(`${apiUrl}/supporters`).then( res => res.data )

    return res.send(supporters)
  } catch(e) {
    res.status(500).send(`There was an error retrieving supporters: ${e.message}`)
  }

})

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
  const { number, repository: repo, owner } = req.body;

  const loggedUser = req.cookies.user || null;

  if( loggedUser ) {

    try {
      let supporter = await axios.get(`${apiUrl}/supporters/${loggedUser}`);

      let assignment = await octokit.issues.addAssigneesToIssue({
        owner,
        repo,
        number,
        assignees: [ supporter.data.user ]
      });

      return res.send('Successfully assigned');
    } catch(e) {
      res.status(500).send(e);
    }
  }

  res.status(401).send('Not logged in');
});

module.exports = router;
