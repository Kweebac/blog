const router = require("express").Router();

router.get("/", (req, res) => res.redirect("/api/posts"));

module.exports = router;
