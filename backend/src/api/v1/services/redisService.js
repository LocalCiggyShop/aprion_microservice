import { createClient } from 'redis'
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from 'url';

if (process.env.NODE_ENV !== 'production') {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    dotenv.config({ path: path.join(__dirname, '.env') });
}

const RedisClient = createClient({
  url: `redis://default:${process.env.REDIS_PASSWORD}@containers-us-west-187.railway.app:6749`,
});
await RedisClient.connect();

RedisClient.on("error", (err) => console.error("Redis Client Error", err));
RedisClient.on("end", (err) => console.error("Redis Client Connection has ended", err));
RedisClient.on("reconnecting", (err) => console.error("Redis Client Reconnecting", err));
RedisClient.on("ready", () => console.log("Redis Client Connected."));

// await RedisClient.disconnect();

// export async function RedisClientDisconnect() {
//     await RedisClient.disconnect();
// }

export default RedisClient