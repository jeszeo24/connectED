var express = require('express');
var router = express.Router();
const db = require("../model/helper");

router.get('/:user_id', async function(req, res,) { // id is user_id
    // which is passed from front end fetch at HomeView
    let id = req.params.user_id;

    // NOTE: get method doesn't have a body, so id must be passed in link (req.params)
    try {
      let results = await db(`SELECT * FROM notes WHERE user_id = ${Number(id)}`); 
      let note = results.data;  
      res.send(note);
  } catch (err) {
      res.status(500).send({ error: err.message });
  }
  });
  
  router.post("/", async (req, res) => {
    let { noteDate, title, note, user_id  } = req.body;
    console.log(req.body);
    let sql = `
        INSERT INTO notes (noteDate, title, note, user_id)
        VALUES ('${noteDate}', '${title}', '${note}', ${Number(user_id)})
    `;
  
    try {
        await db(sql);  
        let result = await db(`SELECT * FROM notes WHERE user_id = ${Number(user_id)}`);
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