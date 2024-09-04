const pg = require('pg')
const express = require('express')
const client = new pg.Client(process.env.DATABASE_URL || 'postgres://localhost/acme_ice_cream_shop_db')
const app = express()



  

  app.use(express.json());
app.use(require('morgan')('dev'));
app.post('/api/flavors', async (req, res, next) => {});
app.get('/api/flavors', async (req, res, next) => {});
app.put('/api/flavors/:id', async (req, res, next) => {});
app.delete('/api/flavors/:id', async (req, res, next) => {});

const init = async () => {
    await client.connect();
    console.log('connected to database');
    let SQL = /* sql */
  `DROP TABLE IF EXISTS flavors;
CREATE TABLE flavors(
id SERIAL PRIMARY KEY,
created_at TIMESTAMP DEFAULT now(),
updated_at TIMESTAMP DEFAULT now(),
ranking INTEGER DEFAULT 3 NOT NULL,
txt VARCHAR(255) NOT NULL
);`

    await client.query(SQL);
    console.log('tables created');
    SQL = `INSERT INTO flavors(txt, ranking) VALUES('mint chip', 5);
    INSERT INTO flavors(txt, ranking) VALUES('vanilla', 4);
    INSERT INTO flavors(txt, ranking) VALUES('strawberry', 2);`
    await client.query(SQL);
    console.log('data seeded');
    const port = process.env.PORT || 3000
    app.listen(port,() => console.log(`listening on port:${port}`));
  };

  init();

