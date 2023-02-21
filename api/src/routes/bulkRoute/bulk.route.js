const {Router} = require("express");
const bulkCreate = require("../../controllers/bulkController/bulk");

const router = Router()

router.get("/", async (req, res) => {
    try {
     const respuesta = await bulkCreate()
      res.status(200).send(respuesta);
  } catch (error) {
    res.status(400).send(error.message);
  }
  });


  module.exports = router;



