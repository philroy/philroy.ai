const jwt = require("jsonwebtoken");
const SECRET = "CHANGE_THIS_KEY";

module.exports = {
  login(req, res) {
    const { username, password } = req.body;

    if (username === "admin" && password === "yourpass") {
      const token = jwt.sign({ user: "admin" }, SECRET, { expiresIn: "12h" });
      return res.json({ success: true, token });
    }

    res.json({ success: false });
  },

  verify(req, res, next) {
    const header = req.headers.authorization;
    if (!header) return res.sendStatus(403);

    const token = header.split(" ")[1];
    try {
      jwt.verify(token, SECRET);
      next();
    } catch {
      res.sendStatus(403);
    }
  }
};
