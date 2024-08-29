const db = require("../database");
const argon2 = require("argon2");

// Select all users from the database.
exports.all = async (req, res) => {
  try {
    const users = await db.user.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Select one user from the database.
exports.one = async (req, res) => {
  try {
    console.log('Username:', req.params.username); // Debugging statement
    const user = await db.user.findByPk(req.params.username);
    console.log('User:', user); // Debugging statement
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Select one user from the database if username and password are a match.
exports.login = async (req, res) => {
  try {
    const user = await db.user.findByPk(req.query.username);
    if (user === null || !(await argon2.verify(user.password_hash, req.query.password))) {
      // Login failed.
      return res.status(401).json({ error: "Invalid username or password" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a user in the database.
exports.create = async (req, res) => {
  try {
    const hash = await argon2.hash(req.body.password, { type: argon2.argon2id });
    const user = await db.user.create({
      username: req.body.username,
      email: req.body.email,
      password_hash: hash
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Update user details, including the username.
exports.update = async (req, res) => {
  const { username } = req.params; // The current username
  const { username: newUsername, email, password } = req.body;

  const transaction = await db.sequelize.transaction();
  try {
    const user = await db.user.findByPk(username, { transaction });
    if (!user) {
      await transaction.rollback();
      return res.status(404).json({ error: "User not found" });
    }

    if (newUsername && newUsername !== username) {
      user.username = newUsername;
    }

    if (email) {
      user.email = email;
    }

    if (password) {
      user.password_hash = await argon2.hash(password, { type: argon2.argon2id });
    }

    await user.save({ transaction });
    await transaction.commit();
    
    res.json(user);
  } catch (error) {
    await transaction.rollback();
    res.status(500).json({ error: error.message });
  }
};




// Delete a user.
exports.delete = async (req, res) => {
  try {
    const user = await db.user.findByPk(req.params.username);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    await user.destroy(); // Delete user
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
