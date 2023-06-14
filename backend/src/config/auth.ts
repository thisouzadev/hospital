const authConfig = {
  jwt: {
    expiresIn: '30d',
    secret: `${process.env.SECRET}` || 'MySuperSecureSecret',
  },
  config_path: `${__dirname}`,
};

export { authConfig };
