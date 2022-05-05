const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// find all tags
router.get('/', (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product, through: ProductTag}]
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// find a single tag by its `id`
router.get('/:id', (req, res) => {
  try {
    const tagData = await Tag.findByPk({
      where: {
        id: req.params.id,
      },
      include: [{model: Product, through: ProductTag}]
    });

    if (!locationData) {
      res.status(404).json({ message: 'No location found with this id!' });
      return;
    }
    res.status(200).json(tagData);
  } catch {
    res.status(500).json(err);
  }
});

// create a new tag
router.post('/', (req, res) => {
  try {
    const tagData = await Tag.create({
      tag_name: req.body.tag_name,
    });
    res.status(200).json(tagData);
  } catch {
    res.status(500).json(err);
  }
});

// update a tag's name by its `id` value
router.put('/:id', (req, res) => {
  try {
    const tagData = await Tag.update({
      tag_name: req.body.tag_name
    },{
      where: {
        id: req.params.id
      },
    });
    res.status(200).json(tagData);
  } catch {
    res.status(500).json(err);
  }
});

// delete on tag by its `id` value
router.delete('/:id', (req, res) => {
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });
    res.status(200).json(tagData);
  } catch {
    res.status(500).json(err);
  }
});

module.exports = router;
