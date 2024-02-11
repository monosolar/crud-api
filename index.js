import http from 'http';

const PORT = process.env.PORT || 4000;

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const query = parsedUrl.query;
  const path = parsedUrl.pathname;
  const method = req.method.toUpperCase();

  console.log('----->', '', query, path, method);
});

server.listen(PORT, () => console.log(`server listening on port: ${PORT}`));
