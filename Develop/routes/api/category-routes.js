const seedCategories = require("../../seeds/category-seeds");
const router = require("express").Router();

const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", (req, res) => {
  // find all categories
  // be sure to include its associated Products
  res.json([
    {
      id: 1,
      category_name: "Shirts",
    },
    {
      id: 2,
      category_name: "Shorts",
    },
    {
      id: 3,
      category_name: "Music",
    },
    {
      id: 4,
      category_name: "Hats",
    },
    {
      id: 5,
      category_name: "Shoes",
    },
  ]);
});

router.get("/:id", (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products

  res.json({
    id: 1,
    category_name: "Hats",
    products: [],
  });
});

router.post("/", (req, res) => {
  // create a new category
  res.send("success!");
});

router.put("/:id", (req, res) => {
  // update a category by its `id` value
  res.send("success fully updated with id " + req.params.id);
});

router.delete("/:id", (req, res) => {
  // delete a category by its `id` value
  res.send("Deleted category with id ", req.params.id);
});

module.exports = router;
