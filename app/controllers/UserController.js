// var Yup = require("yup");
var User = require("../models/user");

class UserController {
  async store2(req, res, next) {
    var credentials = {
      username: req.body.username,
      password: req.body.password
    };

    if (credentials.username === "" || credentials.password === "") {
      req.flash("error", "Verifique nome do usuário e a senha");
      req.flash("showRegisterForm", true);
      res.redirect("/");
      // next();
      return;
    }

    // Verifica se usuário já existe
    const userExist = await User.findOne({
      username: new RegExp("^" + req.body.username + "$", "i"),
      socialId: null
    });

    if (userExist) {
      req.flash("error", "Nome do usuário já existe");
      req.flash("showRegisterForm", true);
      res.redirect("/");
    }

    // Save user
    const user = await User.create(req.body);

    if (user) {
      req.flash("success", "Sua conta foi criada. Por favor, faça log in.");
      res.redirect("/");
    }

    return next();
  }
}

module.exports = new UserController();
// export default new UserController();
