const express = require('express');

const router = express.Router();

const db = require('../data/helpers/actionModel.js');

router.get('/', (req, res) => {
  db
    .get()
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});
router.get('/:id', (req, res) => {
  const { id } = req.params;
  db
    .get(id)
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});
router.post('/', (req, res) => {
  db
    .insert(req.body)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const update = req.body;
  db
    .update(id, update)
    .then(obj => {
      if (!id) {
        res.status(404).json(null);
      } else {
        db.get(id).then(updatedAction => {
          res.status(200).json(updatedAction);
        });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db
    .remove(id)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = router;
