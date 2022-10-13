import { readFile, writeFile, rm } from 'node:fs/promises';
import express from 'express';

import posts from './posts/posts.json' assert { type: 'json' };

var app = express();
var postList = posts;

const appPath = '../dist/tilde';
app.use('/', express.static(appPath));
app.use(express.json());

app.get('/api/login', (req, res) => {
  let password = res.body;
  if (password !== '248mil')
    res.send('null');
})

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
    const file = `./posts/${filename}`;
    console.log(file);
    try {
      await writeFile(file, post.content);
    } catch (e) {
      res.send({written: false, error: 'postfile'});
    }

    postList.push({time: post.time, title: post.title, name: filename});
    writeFile(postListPath, JSON.stringify(postList, null, 2));
});

app.get('/api/blog/post/:filename', async (req, res) => {
  res.set('Content-Type', 'text/markdown');
  try {
    let content = await readFile(`./posts/${req.params.filename}`);
    res.send(content);
  } catch (e) {
    res.send(e);
  }
});

app.delete('/api/blog/post/:filename', async (req, res) => {
  console.log(`Deleting post ${req.params.filename}`)
  try {
    await rm(`./posts/${req.params.filename}`)
  } catch (e) {
    console.log(e);
  }

  postList = posts.filter(post => post.name !== req.params.filename);
  writeFile(postListPath, JSON.stringify(postList, null, 2));
  res.send({deleted: true});
});

app.get('/api/blog/posts', (req, res) => {
  res.json(postList);
});

app.listen(4111, () => {
  console.log('Listening on port 4111');
});
