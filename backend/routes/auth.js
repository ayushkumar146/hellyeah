const {
    login,
    register,
    getAllUsers,
    setAvatar,
    logOut,
  } = require("../controllers/userController");
  
  const router = require("express").Router();
  
  router.post("/login", login); 
  router.post("/register", register); 
  router.get("/allusers/:id", getAllUsers); 
  
  
  module.exports = router;