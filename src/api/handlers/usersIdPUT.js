import { handle505 } from '../../utils/api.js';
import getBody from '../../utils/body.js';

const usersIdPUT = (req, res, collection, uuid) => {
  getBody(req)
    .then((body) => {
      const result = collection.updateUser(uuid, body);

      if (result) {
        res.statusCode = 200;
        res.write(JSON.stringify(result));
        res.end();
      } else {
        handle404(res);
      }
    })
    .catch((err) => {
      console.error('----->', err);
      handle505(res);
    });
};

export default usersIdPUT;
