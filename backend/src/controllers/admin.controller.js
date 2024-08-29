const db = require("../database");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await db.user.findAll({
      attributes: ['id', 'username', 'email', 'dateofJoining']
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
};
