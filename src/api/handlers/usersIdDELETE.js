const usersIdDELETE = (_, res, collection, uuid) => {
  collection.deleteUser(uuid);
  res.statusCode = 204;
  res.end();
};

export default usersIdDELETE;
