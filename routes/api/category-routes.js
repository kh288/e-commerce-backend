const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// find all categories
router.get('/', (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [{model: Product}]
    });
    res.status(200).json(categoryData);
  } catch {
    res.status(500).json(err);
  }
});

// find one category by its `id` value
router.get('/:id', (req, res) => {
  try {
    const categoryData = await Category.findByPk({
      where: {
        id: req.params.id,
      },
      include: [{model: Product}]
    });
    res.status(200).json(categoryData);
  } catch {
    res.status(500).json(err);
  }
});

// create a new category
router.post('/', (req, res) => {
  try {
    const categoryData = await Category.create({
      category_name: req.body.category_name,
    });
    res.status(200).json(categoryData);
  } catch {
    res.status(500).json(err);
  }
});

// update a category by its `id` value
router.put('/:id', (req, res) => {
  try {
    const categoryData = await Category.update({
      category_name: req.body.category_name,
    },{
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(categoryData);
  } catch {
    res.status(500).json(err);
  }
});

// delete a category by its `id` value
router.delete('/:id', (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(categoryData);
  } catch {
    res.status(500).json(err);
  }
});

module.exports = router;
