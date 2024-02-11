const getJSON = async (text) => {
  try {
    const result = JSON.parse(text);
    return result;
  } catch (err) {
    return null;
  }
};

const getReqText = (req) =>
  new Promise((res, rej) => {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    req.on('end', () => {
      res(body);
    });
    req.on('error', () => {
      rej('error');
    });
  });

const getBody = async (req) => {
  try {
    const text = await getReqText(req);
    const body = await getJSON(text);

    return body;
  } catch (error) {
    console.error('---fwe->', error);
    return {};
  }
};

export default getBody;
