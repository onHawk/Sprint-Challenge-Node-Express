const express = require('express');

const router = express.Router();

const db = require('../data/helpers/projectModel.js');

router.get('/', (req, res) => {
  db
    .get()
    .then(response => {
      res.status(200).json(response);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});
router.get('/:id', (req, res) => {
  const { id } = req.params;
  db
    .get(id)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(error => {
      res.status.json(error);
    });
});
router.get('/:id/actions', (req, res) => {
  const { id } = req.params;
  db
    .getProjectActions(id)
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
        db.get(id).then(updatedProject => {
          res.status(200).json(updatedProject);
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
    .then(project => {
      res.status(200).json(project);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});
module.exports = router;
