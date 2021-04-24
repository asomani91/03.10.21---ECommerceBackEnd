const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  res.json([
    {
      id: 1,
      tag_name: "rock music",
    },
    {
      id: 2,
      tag_name: "pop music",
    },
    {
      id: 3,
      tag_name: "blue",
    },
    {
      id: 4,
      tag_name: "red",
    },
    {
      id: 5,
      tag_name: "green",
    },
    {
      id: 6,
      tag_name: "white",
    },
    {
      id: 7,
      tag_name: "gold",
    },
    {
      id: 8,
      tag_name: "pop culture",
    },
  ]);
});

router.get("/:id", (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  res.json({
    tag_name: "rock music",
    products: [
      {
        id: 4,
        product_name: "Top 40 Music Compilation Vinyl Record",
        price: 12.99,
        stock: 50,
        category_id: 3,
      },
    ],
  });
});

router.post("/", (req, res) => {
  // create a new tag
  return res.json(req.body);
});

router.put("/:id", (req, res) => {
  // update a tag's name by its `id` value
  return res.json(req.body);
});

router.delete("/:id", (req, res) => {
  // delete on tag by its `id` value
  return res.json("Successfully deleted tag wit id " + req.params.id);
});

module.exports = router;
