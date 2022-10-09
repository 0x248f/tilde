var express = require('express');
var app = express();

app.use('/', express.static('../dist/tilde'));

app.post('/api/blog', (req, res) => {
    console.log('Got post');
    console.log(req.body);
    res.send('ok');
});

app.listen(4111, () => {
    console.log('Listening on port 4111');
});