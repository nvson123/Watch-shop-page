const express = require("express");
const {
  deleteCategory,
  addCategory,
  getCategoryById,
  getCategorys,
  updateCategory,
  getCategoryBySlug,
  getRootCategory,
  getCategoryShow,
} = require("../controllers/category");

const router = express.Router();
router.get(`/categories`, getCategorys);
router.get(`/category`, getCategoryShow);

router.get(`/categories/danh-muc-goc-a`, getRootCategory);

router.get(`/categorys/:id`, getCategoryById);

router.post(`/categories`, addCategory);

router.get(`/categories/:slug`, getCategoryBySlug);
router.put(`/categorys/:id`, updateCategory);


router.delete(`/categorys/:id`, deleteCategory);
module.exports = router;
