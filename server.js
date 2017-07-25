const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);
const domain = process.env.DOMAIN_ENV || 'localhost:1701';
const path = require('path');
const config = require('dotenv').config().parsed;
const clientId = config.CLIENT_ID;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
   res.header('Access-Control-Allow-Origin', '*');
   res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE');
   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested With, Content-Type, Accept');
   next();
});

app.set('port', process.env.PORT || 1701);

app.locals.title = 'Mentr';

app.get('/', (request, response) => {
  response.sendFile(path.join(__dirname + '/app/index.html'))
  // response.sendFile('./styles/index.scss')
  // response.sendFile('./scripts/index.js')
})

if(process.env.NODE_ENV !== 'production') {
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const config = require('./webpack.config.js');
  const compiler = webpack(config);

  app.use(webpackHotMiddleware(compiler));
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }))
}

app.get('/authenticate', (request, response) => {
  response.redirect(302, `https://github.com/login/oauth/authorize?scope=user:email&client_id=${clientId}`)
})

app.get('/api/v1/mentors', (request, response) => {
  database('mentors').select()
    .then(mentors => {
      if (mentors) {
        response.status(200).json(mentors)
      }
      return response.status(404).json({
        error: 'There were no mentors found!'
      })
    })
    .catch(error => {
      response.status(500).json({ error })
    });
});

app.get('/api/v1/students', (request, response) => {
  database('students').select()
    .then(students => {
      if (students) {
        response.status(200).json(students)
      }
      return response.status(404).json({
        error: 'There were no students found!'
      })
    })
    .catch(error => {
      response.status(500).json({ error })
    });
});

app.get('/api/v1/programs', (request, response) => {
  database('programs').select()
    .then(programs => {
      if (programs) {
        response.status(200).json(programs)
      }
      return response.status(404).json({
        error: 'There were no programs found!'
      })
    })
    .catch(error => {
      response.status(500).json({ error })
    });
});

app.get('/api/v1/mentors/:id', (request, response) => {
  const { id } = request.params;

  database('mentors').where('id', id).select()
    .then(mentor => {
      if (mentor) {
        response.status(200).json(mentor)
      }
      return response.status(404).json({
        error: 'We could not find that mentor!'
      })
    })
    .catch(error => {
      response.status(500).json({ error })
    });
});

app.get('/api/v1/students/:id', (request, response) => {
  const { id } = request.params;

  database('students').select()
    .then(student => {
      if (student) {
        response.status(200).json(student)
      }
      return response.status(404).json({
        error: 'We could not find that student!'
      })
    })
    .catch(error => {
      response.status(500).json({ error })
    });
});

app.get('/api/v1/programs/:id', (request, response) => {
  const { id } = request.params;

  database('programs').select()
    .then(program => {
      if (program) {
        response.status(200).json(program)
      }
      return response.status(404).json({
        error: 'We could not find that program!'
      })
    })
    .catch(error => {
      response.status(500).json({ error })
    });
});

app.post('/api/v1/mentors', (request, response) => {

  const mentor = request.body;

  database('mentors').insert(mentor, 'id')
    .then(mentor => {
      if (result) {
        resonse.status(201).json({ id: mentor[0] });
      } else {
        response.status(201).json({ error: 'You are missing a property'});
      }
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.post('/api/v1/students', (request, response) => {

  const student = request.body;

  database('students').insert(student, 'id')
    .then(student => {
      if (result) {
        resonse.status(201).json({ id: student[0] });
      } else {
        response.status(201).json({ error: 'You are missing a property'});
      }
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.patch('/api/v1/mentors/:id', (request, response) => {
  const { id } = request.params;
  const update = request.body;

  database('mentors').where('id', id).update(update)
    .then(update => {
      response.status(200).json({ update });
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.patch('/api/v1/students/:id', (request, response) => {
  const { id } = request.params;
  const update = request.body;

  database('students').where('id', id).update(update)
    .then(update => {
      response.status(200).json({ update });
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.delete('/api/v1/mentors/:id', (request, response) => {
  const { id } = request.params;

  database('mentors').where('id', id).del()
    .then(qty => {
      response.status(204).json({ qty });
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.delete('/api/v1/students/:id', (request, response) => {
  const { id } = request.params;

  database('students').where('id', id).del()
    .then(qty => {
      response.status(204).json({ qty });
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}`);
});

module.exports = app;