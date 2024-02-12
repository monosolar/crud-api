import http from 'http';
import url from 'url';
import usersPOST from './api/handlers/usersPOST.js';
import { handle404 } from './utils/api.js';
import usersIdGET from './api/handlers/usersIdGET.js';
import usersIdDELETE from './api/handlers/usersIdDELETE.js';
import usersIdPUT from './api/handlers/usersIdPUT.js';
import usersGET from './api/handlers/usersGET.js';

const serverInst = (port, collection) =>
  http
    .createServer((req, res) => {
      const parsedUrl = url.parse(req.url, true);
      const [path] = parsedUrl.pathname.split('?');
      const method = req.method.toUpperCase();
      const pathArray = path.split('/').filter((subPath) => subPath.length > 0);
      const uuid = pathArray[2];

      if (pathArray[0] !== 'api' || pathArray[1] !== 'users' || pathArray[3]) {
        handle404(res);
        return;
      }

      if (uuid && uuid.length > 0) {
        // uuid provided

        // no user found
        const user = collection.getUser(uuid) || {};
        if (!user.username) {
          handle404(res);
          return;
        }

        // user found
        switch (method) {
          case 'GET':
            usersIdGET(req, res, user);
            return;

          case 'PUT':
            usersIdPUT(req, res, collection, uuid);
            return;

          case 'DELETE':
            usersIdDELETE(req, res, collection, uuid);
            return;

          default:
            handle404(res);
            return;
        }
      } else {
        // uuid not provided
        switch (method) {
          case 'POST':
            usersPOST(req, res, collection);
            return;

          case 'GET':
            usersGET(req, res, collection);
            return;

          default:
            handle404(res);
            return;
        }
      }
    })
    .listen(port, () => console.log(`server listening on port: ${port}`));

export default serverInst;
