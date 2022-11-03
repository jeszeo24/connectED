var express = require('express');
var router = express.Router();
const db = require("../model/helper");

/* GET users listing. */
router.get('/', async function(req, res,) {
  try {
    let results = await db('SELECT * FROM reflection'); // where do I add SELECT CONVERT(DATE, refDate,  103)?
    let reflection = results.data;  
    res.send(reflection);
} catch (err) {
    res.status(500).send({ error: err.message });
}
});

router.get("/:id", async (req, res) => {
  let reflectionId = req.params.id;

  try{
    let results = await db(`SELECT * FROM reflection WHERE id = ${reflectionId}`);
    let idResult = results.data;
    if (idResult === 0) {
      res.status(404).send({ error: 'Data not found' });
    } else {
      res.send(idResult[0]);
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
}
});

router.get("/studentId/:studentid", async (req, res) => {
  let studentid = req.params.studentid;

  try {
      let results = await db(`SELECT * FROM reflection WHERE studentid = ${studentid}`);
      let student = results.data;
      if (student.length === 0) {
          res.status(404).send({ error: 'Student not found' });
      } else {
          res.send(student);
      }
  } catch (err) {
      res.status(500).send({ error: err.message });
  }
}); 

router.get("/date/:refDate", async (req, res) => {
  let date = req.params.refDate;

  try {
      let results = await db(`SELECT * FROM reflection WHERE refDate = '${date}'`);
      let reflection = results.data;
      if (reflection.length === 0) {
          res.status(404).send({ error: 'Data not found' });
      } else {
          res.send(reflection);
      }
  } catch (err) {
      res.status(500).send({ error: err.message });
  }
}); 



router.post("/", async (req, res) => {
  let { refDate, studentid, question1, question2, question3, question4, question5, question6 } = req.body;

  let sql = `
      INSERT INTO reflection (refDate, studentid, question1, question2, question3, question4, question5, question6)
      VALUES ('${refDate}', '${studentid}', '${question1}', '${question2}', '${question3}', '${question4}', '${question5}', '${question6}')
  `;

  try {
      await db(sql);  
      let result = await db('SELECT * FROM reflection');
      let reflection = result.data;
      res.status(201).send(reflection); 
  } catch (err) {
      res.status(500).send({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  let refId = req.params.id;

  try {
      let result = await db(`SELECT * FROM reflection WHERE id = ${refId}`); 
      if (result.data.length === 0) {
          res.status(404).send({ error: 'Data not found' });
      } else {
          await db(`DELETE FROM reflection WHERE id = ${refId}`); 
          let result = await db('SELECT * FROM refelection');
          let reflection = result.data;
          res.send(reflection);  
      } 
  } catch (err) {
      res.status(500).send({ error: err.message });
  }
});


module.exports = router;
