module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'd0721c83497f4c95d4862c778071fb30'),
  },
});
