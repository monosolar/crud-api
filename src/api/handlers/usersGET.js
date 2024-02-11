const usersGET = (_, res, collection) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(collection.getUsers()));
};

export default usersGET;
