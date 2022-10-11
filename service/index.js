import { readFile, writeFile } from 'node:fs/promises';
import express from 'express';

import posts from './posts/posts.json' assert { type: 'json' };

var app = express();

const appPath = '../dist/tilde';
app.use('/', express.static(appPath));
app.use(express.json());

const postListPath = './posts/posts.json';
app.post('/api/blog', async (req, res) => {
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
    const filepath = './posts';
    const file = filepath + '/' + filename;
    console.log(file);
    try {
      await writeFile(file, post.content);
    } catch (e) {
      res.send({written: false, error: 'postfile'});
    }

    posts.push({time: post.time, title: post.title, name: filename});
    try {
      await writeFile(postListPath, JSON.stringify(posts, null, 2));
      res.send({written: true});
    } catch (e) {
      res.send({written: false, error: 'jsonfile'});
    }
});

app.get('/api/blog/post/:filename', async (req, res) => {
  res.set('Content-Type', 'text/markdown');
  try {
    let content = await readFile('./posts/' + req.params.filename);
    res.send(content);
  } catch (e) {
    res.send(e);
  }
});

app.get('/api/blog/posts', (req, res) => {
  res.json(posts);
});

app.listen(4111, () => {
    console.log('Listening on port 4111');
});
