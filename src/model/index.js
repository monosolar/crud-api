import { v1 as uuidv1 } from 'uuid';
class Collection {
  constructor() {
    this.data = {};
  }

  createUser({ username, age, hobbies }) {
    const uuid = uuidv1();
    this.data[uuid] = { username, age, hobbies };

    return uuid;
  }

  updateUser(uuid, data) {
    const user = this?.data[uuid] || {};

    if (user.username) {
      this.data[uuid] = { ...this.data[uuid], ...data };
      return this.data[uuid];
    } else {
      return undefined;
    }
  }

  getUser(uuid) {
    return this.data[uuid];
  }

  deleteUser(uuid) {
    delete this.data[uuid];
  }

  getUsers() {
    return this.data;
  }
}

export default Collection;
