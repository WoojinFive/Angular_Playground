var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');

app.use(bodyParser.json());
app.use((request, response, next) => {
  response.header('Access-Control-Allow-Origin', '*');
  response.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

var messages = [
  {
    text: 'some text',
    owner: 'Tim'
  },
  {
    text: 'other message',
    owner: 'Jane'
  }
];
var users = [
  {
    firstName: 'a',
    email: 'a@a.aa',
    password: 'a',
    id: 0
  }
];

var api = express.Router();
var auth = express.Router();

api.get('/messages', (req, res) => {
  res.json(messages);
});

api.get('/messages/:user', (req, res) => {
  const user = req.params.user;
  const result = messages.filter(message => message.owner == user);
  res.json(result);
});

api.post('/messages', (req, res) => {
  messages.push(req.body);
  res.json(req.body);
});

auth.post('/login', (req, res) => {
  var user = users.find(user => user.email == req.body.email);
  if (!user) sendAuthError(res);
  if (user.password == req.body.password) sendToken(user, res);
  else sendAuthError(res);
});

auth.post('/register', (req, res) => {
  var index = users.push(req.body) - 1;
  var user = users[index];
  user.id = index;

  sendToken(user, res);
});

function sendToken(user, res) {
  var token = jwt.sign(user.id, '123');
  res.json({ firstName: user.firstName, token });
}

function sendAuthError(res) {
  return res.json({ success: false, message: 'email or password incorrect' });
}

app.use('/api', api);
app.use('/auth', auth);

app.listen(3000);
