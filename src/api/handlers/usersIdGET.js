const usersIdGET = (_, res, user) => {
  res.statusCode = 200;
  res.write(JSON.stringify(user));
  res.end();
};

export default usersIdGET;
