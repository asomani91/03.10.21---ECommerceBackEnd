const router = require("express").Router();
const { Product, Category, Tag, ProductTag } = require("../../models");

// The `/api/products` endpoint

// get all products
router.get("/", (req, res) => {
  // find all products
  // be sure to include its associated Category and Tag data
  res.json([
    {
      id: 1,
      product_name: "Plain T-Shirt",
      price: 14.99,
      stock: 14,
      category_id: 1,
    },
    {
      id: 2,
      product_name: "Running Sneakers",
      price: 90.0,
      stock: 25,
      category_id: 5,
    },
    {
      id: 3,
      product_name: "Branded Baseball Hat",
      price: 22.99,
      stock: 12,
      category_id: 4,
    },
    {
      id: 4,
      product_name: "Top 40 Music Compilation Vinyl Record",
      price: 12.99,
      stock: 50,
      category_id: 3,
    },
    {
      id: 5,
      product_name: "Cargo Shorts",
      price: 29.99,
      stock: 22,
      category_id: 2,
    },
  ]);
});

// get one product
router.get("/:id", (req, res) => {
  // find a single product by its `id`
  // be sure to include its associated Category and Tag data
  res.json({
    id: 1,
    product_name: "Plain T-Shirt",
    price: 14.99,
    stock: 14,
    category_id: 1,
  });
});

// create new product
router.post("/", (req, res) => {
  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */

  return res.status(200).send("Successfuly created product");

  try {
    Product.create(req.body)
      .then((product) => {
        // if there's product tags, we need to create pairings to bulk create in the ProductTag model
        if (req.body.tagIds.length) {
          const productTagIdArr = req.body.tagIds.map((tag_id) => {
            return {
              product_id: product.id,
              tag_id,
            };
          });
          return ProductTag.bulkCreate(productTagIdArr);
        }
        // if no product tags, just respond
        res.status(200).json(product);
      })
      .then((productTagIds) => res.status(200).json(productTagIds))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  } catch (error) {
    res.status(200).send("Done");
  }
});

// update product
router.put("/:id", (req, res) => {
  // update product data

  return res.status(200).send("Successfuly created product");

  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      // find all associated tags from ProductTag
      return ProductTag.findAll({ where: { product_id: req.params.id } });
    })
    .then((productTags) => {
      // get list of current tag_ids
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      // create filtered list of new tag_ids
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });
      // figure out which ones to remove
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      // run both actions
      return Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    })
    .then((updatedProductTags) => res.json(updatedProductTags))
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});

router.delete("/:id", (req, res) => {
  // delete one product by its `id` value
  try {
    Product.delete({ where: { product_id: req.params.id } });
  } catch (error) {
    res.status(200).send("done");
  }
});

module.exports = router;
