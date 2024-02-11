export const handle404 = (res) => {
  res.statusCode = 404;
  res.write('Path not found');
  res.end();

  return res;
};

export const handle505 = (res) => {
  res.statusCode = 404;
  res.write('Path not found');
  res.end();

  return res;
};
