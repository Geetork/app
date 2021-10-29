// modules setup
const mongoose = require('mongoose');
const crypto = require('crypto');

// mongodb model setup
const userSchema = new mongoose.Schema({
  login: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const UserSchema = mongoose.model('users', userSchema);

class User {

  constructor(login, password) {
    this.login = login;
    this.password = password;
  };

  createUser(){
    this.password = this.hashPassword();
    return new UserSchema(this).save();
  };

  async checkUser() {
    let doc = await UserSchema.findOne({login: this.login});
    if ( doc.password === this.hashPassword() ){
      console.log("User password is ok");
    } else {
      console.log("Error wrong");
    };
  };

  static async getUser(obj) {
    return Promise.resolve(UserSchema.findOne( {login: obj.login} ));
  };

  hashPassword(){
    let hash = crypto.createHash('sha256')
                        .update(this.password)
                        .digest('hex');
    return hash;
  };

};

module.exports = User;
