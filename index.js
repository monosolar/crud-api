import 'dotenv/config';
import Collection from './src/model/index.js';

import serverInst from './src/serverInst.js';

const PORT = process.env.PORT || 4040;

const collection = new Collection();

const isMultiMode = process.argv.slice(2).includes('--multi');

serverInst(PORT, collection);
