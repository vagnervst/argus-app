var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var axios = require('axios');
const { Schema } = mongoose;

const supportersSchema = mongoose.Schema({
  name: String,
  user: String,
  password: String
});

const IssueSchema = mongoose.Schema({
  githubId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  bodyText: { type: String, required: false },
  state: { type: String, required: true },
  url: { type: String, required: true },
  createdAt: { type: Date, required: true },
  authorId: { type: Schema.Types.ObjectId, required: true },
  assignees: { type: [ Schema.Types.ObjectId ] },
  supportAssignee: { type: Schema.Types.ObjectId },
  repositoryId: { type: Schema.Types.ObjectId, required: true },
  commentsCount: { type: Number, default: 0 }
});

const Supporters = mongoose.model('supporters', supportersSchema);
const Issues = mongoose.model('issues', IssueSchema);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', async function(req, res, next) {
  const { username, password } = req.body;

  let request = await axios.post('http://localhost:8081/supporters/login', {
    user: username,
    password: password
  }).then( res => res.data );

  res.cookie('user', request._id);
  res.send('ok');
});

router.get('/login', function(req, res, next) {
  const loggedUser = req.cookies.user || null;
  res.send(loggedUser);
});

router.post('/issue/assign', async function(req, res, next) {
  const { id: issueId } = req.body;

  const loggedUser = req.cookies.user || null;

  if( loggedUser ) {
    let response = await axios.put(`http://localhost:8081/issues/${issueId}/assign`, {
      supporter: loggedUser
    });

    res.json(response.data);
    return;
  }

  res.send('Not logged in');
});

module.exports = router;
