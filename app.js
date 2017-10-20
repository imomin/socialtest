const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('port', (process.env.PORT || 5000));

/* For Facebook Validation */
app.get('/webhook', (req, res) => {
  if (req.query['hub.mode'] && req.query['hub.verify_token'] === 'i_know_kungfu') {
    res.status(200).send(req.query['hub.challenge']);
  } else {
    res.status(403).end();
  }
});

app.get('/', (req, res) => {
  res.status(200).send("OK");
});

/* Handling all messenges */
app.post('/webhook', (req, res) => {
  console.log(req.body);
  if (req.body.object === 'page') {
    console.log(JSON.stringify(req.body));
    // req.body.entry.forEach((entry) => {
    //   entry.messaging.forEach((event) => {
    //     console.log(JSON.stringify(event));
    //   });
    // });
    res.status(200).end();
  }
});

const server = app.listen(app.get('port'), () => {
  console.log('Express server listening on port %d in %s mode', server.address().port, app.settings.env);
});
