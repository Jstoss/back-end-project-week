const express = require('express');
const db = require('../data/helpers/notes');

const router = express.Router();

//get all notes
router.get('/', async (req, res) => {
  try{
    const notes = await db.get();
    res.status(200).json(notes)
  } catch(e){
    res.status(500).json(e);
  }
});

//get a note by id
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try{
    const note = await db.get(id);
    note ? res.status(200).json(note) : res.status(404).json({message: 'No note with that id'});
  }catch(e){
    res.status(500).json(e);
  }
});

//post a new note
router.post('/', async (req, res) => {
  const { title, content } = req.body;
  if(!title || !content){
    res.status(422).json({message: 'Missing title or content for new note' });
  }else{
    try{
      const id = await db.add(title, content);
      res.status(201).json(id);
    }catch (e){
      res.status(500).json(e);
    }
  }
});

//put a note update
router.put('/:id', (req, res) => {

});

//delete a note by id
router.delete('/:id', (req, res) => {

});

module.exports = router;
