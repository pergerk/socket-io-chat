module.exports = {
  development: {
    host: "localhost",
    port: 6379
  },
  test: {
    host: "redis_test",
    port: 6379
  },
  production: {
    host: "redis",
    port: 6379
  }
};
