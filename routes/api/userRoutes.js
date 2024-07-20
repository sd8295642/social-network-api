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
  
  router.route('/').get(getUsers).post(createUser);

  router.route('/:userId').put(updateUser);
  
  router.route('/:userId').get(getSingleUser).delete(deleteUser);

  router.route('/:userId/friends/:friendId').post(addFriend);
  
  router.route('/:userId/friends/:friendId').delete(removeFriend);

module.exports = router;