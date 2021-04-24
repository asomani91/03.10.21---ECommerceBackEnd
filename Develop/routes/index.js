const router = require("express").Router();
const apiRoutes = require("./api/index");

router.use("/routes", apiRoutes);

router.use((req, res) => {
  res.send("<h1>Wrong Route!</h1>");
});

module.exports = router;
