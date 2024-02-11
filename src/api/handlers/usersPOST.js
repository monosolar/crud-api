import { handle505 } from '../../utils/api.js';
import getBody from '../../utils/body.js';
import { getCreateValidateMessage } from '../../utils/validations.js';

const usersPOST = (req, res, collection) => {
  getBody(req)
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
    })
    .catch((err) => {
      console.error('----->', err);
      handle505(res);
    });
};

export default usersPOST;
