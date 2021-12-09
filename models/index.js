// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category

Product.belongsTo(Category, {
  foreignKey: 'category_id',

  //delete the association when a product is deleted
  onDelete: 'CASCADE',
  onUpdate:'CASCADE',

});

// Categories have many Products

Category.hasMany(Product, {
  foreignKey: 'category_id',
  onDelete: 'CASCADE',
  onUpdate:'CASCADE',
});

// Products belongToMany Tags (through ProductTag)

Product.belongsToMany(Tag, {
  as: 'Tags',
  through: ProductTag,
  foreignKey: 'product_id',
  onDelete: 'CASCADE',
  onUpdate:'CASCADE',
});

// Tags belongToMany Products (through ProductTag)

Tag.belongsToMany(Product, {
  as: 'Product',
  through: ProductTag,
  foreignKey: 'tag_id',
  onDelete: 'CASCADE',
  onUpdate:'CASCADE',
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
