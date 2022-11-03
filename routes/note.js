var express = require('express');
var router = express.Router();
const db = require("../model/helper");

router.get('/', async function(req, res,) {
    try {
      let results = await db('SELECT * FROM notes'); 
      let note = results.data;  
      res.send(note);
  } catch (err) {
      res.status(500).send({ error: err.message });
  }
  });
  
  router.post("/", async (req, res) => {
    let { noteDate, title, note  } = req.body;
    let sql = `
        INSERT INTO notes (noteDate, title, note)
        VALUES ('${noteDate}', '${title}', '${note}')
    `;
  
    try {
        await db(sql);  
        let result = await db('SELECT * FROM notes');
        let note = result.data;
        res.status(201).send(note); 
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
  });
  
  router.delete("/:id", async (req, res) => {
    let noteId = req.params.id;
  
    try {
        let result = await db(`SELECT * FROM notes WHERE id = ${noteId}`);  
        if (result.data.length === 0) {
            res.status(404).send({ error: 'Data not found' });
        } else {
            await db(`DELETE FROM notes WHERE id = ${noteId}`);  
            let result = await db('SELECT * FROM notes');
            let note = result.data;
            res.send(note);  
        } 
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
  });

  module.exports = router;