const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  try {
    const tags = await Tag.findAll({
      // be sure to include its associated Product data
      include: [{ model: Product, as: 'Product' }],
    });
    res.status(200).json(tags);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  try{
    const tag = await Tag.findByPk(req.params.id, {
  // be sure to include its associated Product data
      include: [{model: Product, as : 'Product'}],
    });
    //check if there are tags with inputted id
    if (!tag){
      res.status(400).json({message: 'No tag found with that ID'});
      return;
    }
    res.status(200).json(tag);
  } catch (error) {
    console.log (error);
    res.status(500).json(error);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  /* req.body should look like this...
    {
      tag_name: "Outdoors"
    }
  */
try {
  const newTag = await Tag.create(req.body);
  res.status(200).json(newTag);
}
catch (err) {
  console.log(err);
  res.status(500).json(err);
}

});

router.put ('/:id', async (req, res) => {
  // update a tag's name by its `id` value
try {
  const updatedTag = await Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  });
  res.status(200).json(updatedTag);

}
catch (err) {
console.log(err);
res.status(500).json(err);
}

});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const deleteTag = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });
    res.status(200).json(deleteTag);
  }
  catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;