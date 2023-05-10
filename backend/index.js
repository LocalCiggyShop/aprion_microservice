import express from 'express';
const app = express();
// import middlewares from "./src/utils/middleware/promise.js";
import index from './src/api/v1/routes/index.js';
import dotenv from "dotenv";
import path from 'path';
import cors from 'cors';
// import https from 'https';
// import fs from 'fs';
import rateLimit from 'express-rate-limit';
//import os from 'os';
import helmet from 'helmet'
import { fileURLToPath } from 'url';
//import cluster from 'cluster';

app.use(express.json());
app.enable("trust proxy", 0);
app.disable('x-powered-by');
app.use(helmet());
app.use(cors());

const apiLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    // skip: (request, response) => process.env.rate_limit_allow_list.includes(request.ip),
})

// const numCPU = os.cpus().length;
const PORT = process.env.PORT || 5000;

// process.on('uncaughtException', (err) => {
//     console.error('There was an uncaught error', err);
//     process.exit(1); //mandatory (as per the Node.js docs)
// });

// app.use(function(req, res,next) {
//     res.status(404).send('<h1> Page not found </h1>');
// });
if (process.env.NODE_ENV !== 'production') {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    dotenv.config({ path: path.join(__dirname, '.env') });
}
// Middlewares
// app.use(middlewares())
app.use(apiLimiter);

// Nginx uses /api/v1
app.use('/', index);

// if(cluster.isPrimary) {
//     for(let i = 0; i<numCPU; i++) {
//         cluster.fork()
//     }
// } else {
    // https.createServer(
    //     {
    //         key: fs.readFileSync("server.key"),
    //         cert: fs.readFileSync("server.cert")
    //     },
    //     app
    // )
    app.listen(PORT, () => {
        console.log(`listening on port ${PORT}.`)
    });
// }
