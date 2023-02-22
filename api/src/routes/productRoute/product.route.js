const {Router} = require("express")
const { postProduct, getAllProducts, updateProduct, deleteProduct } = require("../../controllers/productController/product")


const router = Router()

router.post("/", async(req, res)=>{
  try {
      const productData = req.body;
      const productDataCreated = await postProduct(productData)
      res.status(200).json(productDataCreated)
  } catch (error) {
      res.status(400).send(error.message)
  }
})

router.get("/", async (req,res) => {
  try {
    const { name } = req.query;
    if (name) {
      const productName = await getAllProducts(name);
      res.status(200).json(productName);
    }else{
      res.status(200).json(await getAllProducts());
    }
  } catch (error) {
    res.status(404).send(error.message);
  }
});


router.put("/", async (req, res) => {
    try {
        const newDataProduct = req.body
        const updated = await updateProduct(newDataProduct)
        res.status(200).send(updated);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.put("/delete", async (req, res) => {
  try {
    const newDataProduct = req.body
    const updated = await deleteProduct(newDataProduct)
    res.status(200).send(updated);
} catch (error) {
    res.status(400).send(error.message);
}
})

router.delete("/", async (req, res) => {
    try {
    const { id } = req.body;
      if (id) {
        deleteProduct(id)
        res.status(200).send(`${id} was deleted succesfully`);
      } else {
        res.status(404).send("ID not found");
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
  });


module.exports = router;