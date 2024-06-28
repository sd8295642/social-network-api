const { User, Thought } = require('../models');

module.exports = {
    async getUsers(req, res) {
      try {
        const users = await User.find();
  
        res.json(users);
      } catch (err) {
        console.log(err);
        return res.status(500).json(err);
      }
    },
    async getSingleUser(req, res) {
        try {
          const user = await User.findOne({ _id: req.params.userId })
    
          if (!user) {
            return res.status(404).json({ message: 'No existing user' })
          }
    
          res.json(user);
        } catch (err) {
          console.log(err);
          return res.status(500).json(err);
        }
      },
      async createUser(req, res) {
        try {
          const user = await User.create(req.body);
          res.json(user);
        } catch (err) {
          res.status(500).json(err);
        }
      },
      async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
              { _id: req.params.userId },
              { $set: req.body },
              { runValidators: true, new: true }
            );
      
            if (!user) {
              return res
                .status(404)
                .json({ message: 'No user found with that ID :(' });
            }
      
            res.json(user);
          } catch (err) {
            res.status(500).json(err);
          }
      },
      async deleteUser(req, res) {
        try {
          const user = await User.findOneAndRemove({ _id: req.params.userId });
    
          if (!user) {
            return res.status(404).json({ message: 'No existing user' });
          }
    
        //   const thought = await Thought.findOneAndUpdate(
        //     { users: req.params.userId },
        //     { $pull: { users: req.params.userId } },
        //     { new: true }
        //   );
    
        //   if (!thoughts) {
        //     return res.status(404).json({
        //       message: 'User deleted, no thoughts found',
        //     });
        //   }
    
          res.json({ message: 'User successfully deleted' });
        } catch (err) {
          console.log(err);
          res.status(500).json(err);
        }
      },
      async addFriend(req, res) {
        console.log('You are adding a friend');
        console.log(req.body);
    
        try {
          const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { runValidators: true, new: true }
          );
    
          if (!user) {
            return res
              .status(404)
              .json({ message: 'No user found with that ID :(' });
          }
    
          res.json(user);
        } catch (err) {
          res.status(500).json(err);
        }
      },
      async removeFriend(req, res) {
        try {
          const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: { friendId: req.params.friendId } } },
            { runValidators: true, new: true }
          )
          //.populate("friends")
    
          if (!user) {
            return res
              .status(404)
              .json({ message: 'No user found with that ID :(' });
          }
    
          res.json(user);
        } catch (err) {
          res.status(500).json(err);
        }
      },
};
