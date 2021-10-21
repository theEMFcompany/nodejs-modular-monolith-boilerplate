const dependencies = require("./dependencies");
const c = {
  statuses: {
    closed: "CLOSED"
  },
  actions: {
    createUser: "CREATE:USER"
  }
};
module.exports = Object.assign({}, c, dependencies.constants);
