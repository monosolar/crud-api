import http from 'http';
import url from 'url';
import { parse } from 'querystring';

import { v1 as uuidv1 } from 'uuid';

const PORT = process.env.PORT || 4000;

const notFoundEndresponse = (res) => {
  res.statusCode = 404;
  res.write('Path not found');
  res.end();

  return res;
};

const getJSON = async (text) => {
  try {
    const result = JSON.parse(text);
    return result;
  } catch (err) {
    console.log('----->', 'err', err);
    return null;
  }
};

const getBody = (req) =>
  new Promise((res, rej) => {
    let body = '';
    req.on('data', (chunk) => {
      console.log('----->', 'chunk', chunk);
      body += chunk.toString();
    });
    req.on('end', () => {
      console.log('----->', 'body', body);
      res(body);
    });
    req.on('error', () => {
      rej('error');
    });
  });

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
      this.data[uuid] = { ...this.data[uuid], data };
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

const collection = new Collection();

const getCreateValidateMessage = (data = {}) => {
  if (!data.username || data.username.length === 0) {
    return 'No username';
  }

  if (!data.age) {
    return 'No age';
  }

  if (!Array.isArray(data.hobbies)) {
    return 'No age';
  }
};

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const [path] = parsedUrl.pathname.split('?');
  const method = req.method.toUpperCase();

  const pathArray = path.split('/').filter((subPath) => subPath.length > 0);

  // todo ['api', 'users', '23r-23r-erfw']

  if (pathArray[0] !== 'api' || pathArray[1] !== 'users' || pathArray[3]) {
    notFoundEndresponse(res);
    return;
  }

  const uuid = pathArray[2];
  if (uuid && uuid.length > 0) {
    // uuid provided

    // no user found
    const user = collection.getUser(uuid) || {};
    if (!user.username) {
      notFoundEndresponse(res);
      return;
    }

    // user found
    switch (method) {
      case 'GET':
        res.statusCode = 200;
        res.write(JSON.stringify(user));
        res.end();
        return;

      case 'PUT':
        getBody(req)
          .then((text) => getJSON(text))
          .then((body) => {
            const result = collection.updateUser(uuid, body);

            if (result) {
              res.statusCode = 200;
              res.write(result);
              res.end();
            } else {
              notFoundEndresponse(res);
            }
          })
          .catch((err) => {
            console.log('----->', 'err', err);
            res.statusCode = 500;
            res.write('Server error');
            res.end();
          });
        return;

      case 'DELETE':
        collection.deleteUser(uuid);
        res.statusCode = 204;
        res.end();
        return;

      default:
        notFoundEndresponse(res);
        return;
    }
  } else {
    // uuid not provided

    switch (method) {
      case 'POST':
        getBody(req)
          .then((text) => getJSON(text))
          .then((body) => {
            const validateMessage = getCreateValidateMessage(body);

            if (validateMessage) {
              res.statusCode = 400;
              res.write(validateMessage);
              res.end();
              return;
            }

            const uuid = collection.createUser(body);

            res.statusCode = 201;
            res.write(uuid);
            res.end();
            return;
          })
          .catch(() => {
            res.statusCode = 500;
            res.write('Server error');
            res.end();
          });

        break;

      case 'GET':
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(collection.getUsers()));
        break;

      default:
        notFoundEndresponse(res);
        return;
    }
  }
});

server.listen(PORT, () => console.log(`server listening on port: ${PORT}`));
