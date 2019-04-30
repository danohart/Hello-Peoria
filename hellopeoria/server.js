const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();

    server.get('/category/:category', (req, res) => {
      return app.render(req, res, '/category', {
        category: req.params.category
      });
    });

    // server.get('/place/:id', (req, res) => {
    //   return app.render(req, res, '/place', {
    //     place: req.params.id
    //   });
    // });

    server.get('*', (req, res) => {
      return handle(req, res);
    });

    server.listen(7777, err => {
      if (err) throw err;
      console.log('> Ready on http://localhost:7777');
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
