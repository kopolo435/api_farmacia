const config = {
  port: process.env.PRODUCTION_PORT || 3000,
  cors: process.env.CORS,
  jwtSecret: process.env.JWTSECRET,
};

// eslint-disable-next-line import/prefer-default-export
export { config };
