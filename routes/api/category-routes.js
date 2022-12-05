const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findAll({
      // Search for multiple instances.
      include: [{ model: Product }]
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {

    const categoryData = await Category.findByPk(req.params.id, {
    // findByPk searches for a single instance by its primary key.
    // This applies LIMIT 1, so the listener will always be called with a single instance.
      include: [{ model: Product }]
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category found!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const categoryData = await Category.create(req.body);
    // Builds a new model instance and calls save on it.
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const categoryData = await Category.update(
      req.body,
      { where: { id: req.params.id } }
    );

    if (!categoryData) {
      res.status(404).json({ message: 'No category found!' });
      return;
    }

    res.status(200).json(`The following category has been updated: ${req.params.id}`);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category found!' });
      return;
    }

    res.status(200).json(`The following category has been deleted: ${req.params.id}`);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
