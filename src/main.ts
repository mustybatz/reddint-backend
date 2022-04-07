import express from 'express';
import { DbConfig } from './core/db.config';

import router from './core/routes';

const app = express();

app.use(express.json());

app.use(router);

const PORT = process.env.PORT || 4000;

const dbConfig = DbConfig.getInstance();

dbConfig.connect().then(() => {
    app.listen(PORT, () => console.log(`🚢🚢 Server is running on port ${PORT}`));
}).catch(err => {
    console.error(err);
})
