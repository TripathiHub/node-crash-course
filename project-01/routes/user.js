const express = require("express");
const router = express.Router();
const {
  handleGetAllUsers,
  handleCreateNewUser,
  handleGetUserById,
  handleDeleteUserById,
  handlePatchById,
} = require("../controllers/user");
router
.route("/")
.get(handleGetAllUsers)
.post(handleCreateNewUser);
router
  .route("/:id")
  .get(handleGetUserById)
  .delete(handleDeleteUserById)
  .patch(handlePatchById);
module.exports = router;
