const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  try {
    const allCat = await Category.findAll({
      // be sure to include its associated Products
      include: [{ model: Product }]
    });
    res.status(200).json(allCat);

  }
  catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  try {
    const cat = await Category.findByPk(req.params.id, {
      include: [{model: Product}]
    });
  
    if (!cat) {
      res.status(400).json({message: "No Category found with that ID"});
      return;
    }
    res.status(200).json(cat);

    
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.post('/', async (req, res) => {
  // create a new category

  try {
    const newCat = await Category.create(req.body);
    res.status(200).json(newCat);
    
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value

  try {
    const updateCat = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if(!updateCat){
      res.status(400).json({message: "No Category wih that ID found"});
    }
    res.status(200).json(updateCat);
    
  } catch (error) {
    
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const delCat = await Category.destroy({
      where: {
        id: req.params.id
      }
    });
    res.status(200).json(delCat);
    
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
    
  }


});

module.exports = router;
