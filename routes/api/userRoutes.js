const router = require('express').Router();

const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend,
  } = require('../../controllers/userController');
  
  router.route('/').get(getUsers).post(createUsers);
  
  router.route('/:userId').get(getSingleUser).delete(deleteUser);

  router.route('/:userId/friends').post(addFriend);
  
  router.route('/:userId/friends/:friendId').delete(removeFriend);

module.exports = router;