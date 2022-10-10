const fs = require('fs');
const express = require('express');
var app = express();

const appPath = '../dist/tilde';
app.use('/', express.static(appPath));
app.use(express.json());

const postListPath = appPath + '/assets/blog/posts.json';
app.post('/api/blog', (req, res) => {
    console.log('Got post');
    console.log(req.body);
    if (req.body.password !== '248mil')
      return res.json({written: false, error: 'password'});

    let time = new Date();
    let timeString = time.toLocaleString('ca');
    const post = {
      time: timeString,
      title: req.body.title,
      content: req.body.content
    };

    const filename = post.title.toLowerCase().replaceAll(' ', '-') + '.md';
    const filepath = appPath + '/assets/blog/post';
    const filelink = '/assets/blog/post/' + filename;
    const file = filepath + '/' + filename;
    console.log(file);
    console.log(filelink);
    fs.writeFile(filepath + '/' + filename, post.content, (err) => {
      if (err)
        console.log(err);

      var posts = require(postListPath);
      posts.push({time: post.time, name: post.title, link: filelink});
      fs.writeFile(postListPath, JSON.stringify(posts, null, 2), (err) => {
        if (err)
          console.log(err);
      });
    });
});

app.listen(4111, () => {
    console.log('Listening on port 4111');
});
