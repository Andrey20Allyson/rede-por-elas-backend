class ResponseData {
  body;
  status;

  constructor(status, body) {
    this.status = status;
    this.body = body;
  }
}

function ok(body) {
  return new ResponseData(200, body);
}

function created(body) {
  return new ResponseData(201, body);
}

function serverError() {
  return new ResponseData(500, { message: 'Internal Server Error' });
}

function conflict(field) {
  return new ResponseData(409, { message: `Insertion Conflicts With Persisted Data`, field });
}

module.exports = { ok, created, serverError, conflict, ResponseData };