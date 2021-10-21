import * as dependencies from './dependencies';
const c = {
  statuses: {
    closed: 'CLOSED'
  },
  actions: {
    createUser: 'CREATE:USER'
  }
};

export default Object.assign({}, c, dependencies.constants);
