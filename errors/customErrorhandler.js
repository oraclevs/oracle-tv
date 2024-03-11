class CUSTOMERRORS extends Error {
  constructor(message, statusCode) {
    super(message, statusCode);
    this.statusCode = statusCode;
    this.message = message;
  }
}

module.exports = { CUSTOMERRORS };
