export default {
  host: String(process.env.REDIS_HOST),
  port: Number(process.env.REDIS_PORT),
  database: Number(process.env.REDIS_DATABASE),
};
