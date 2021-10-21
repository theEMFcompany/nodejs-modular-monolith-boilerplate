module.exports = (res, responseCode = 0, responseText = "", payload, error) => {
  const responder = {
    responseCode,
    responseText
  };
  if (payload) {
    responder.payload = payload;
  }
  if (error) {
    responder.error = error;
  }

  return res.json(responder);
};
