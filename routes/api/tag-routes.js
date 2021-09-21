const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");



router.get("/", async (req, res) => {

  const tagData = await Tag.findAll({
    include: [Product],
  });
  res.json(tagData);
});

router.get("/:id", async (req, res) => {

  const tagIDData = await Tag.findByPk(req.params.id, {
    include: [Product],
  }).catch((err) => {
    res.status(500).json(err);
  });
  if (!tagIDData)
    return res
      .status(404)
      .json({ message: `There is no Tag by the ID of ${req.params.id}` });
  res.status(200).json(tagIDData);
});

router.post("/", async (req, res) => {

  const newTagData = await Tag.create(req.body).catch((err) =>
    res.status(500).json(err.message)
  );
  res.status(200).json(newTagData);
});

router.put("/:id", async (req, res) => {

  const updateIDTagData = await Tag.update(req.body, {
    where: { id: req.params.id },
  }).catch((err) => res.status(500).json(err.message));
  if (!updateIDTagData[0])
    return res.status(404).json({
      message: `Please check your Tag ID of ${req.params.id} and what you are updating`,
    });
  else res.status(200).json({ message: `Updated ID ${req.params.id}` });
});

router.delete("/:id", async (req, res) => {

  const deleteIDData = await Tag.destroy({ where: { id: req.params.id } });
  if (!deleteIDData)
    return res
      .status(404)
      .json({ message: `There is no data by ID ${req.params.id}` });
  res.status(200).json({ message: `You have DELETED ID ${req.params.id}` });
});

module.exports = router;