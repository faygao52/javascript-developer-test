const { httpGet } = require('./mock-http-interface');
const OK_STATUS = 200
const SUCCESS_KEY = 'Arnie Quote'
const FAILURE_KEY = 'FAILURE'
const getArnieQuotes = async (urls) => {
  const requests = urls.map(httpGet)
  let responses = await Promise.all(requests)
  return responses.map(_formatResult)
};

/**
 * Format the response to 
 * {key: response body }
 * 
 * @param {Object} response 
 * @returns {Object}
 */
const _formatResult = (response) => {
  const body = JSON.parse(response.body)
  const message = body.message || ''
  if (response.status === OK_STATUS) {
    return { [SUCCESS_KEY]: message }
  }
  return { [FAILURE_KEY]: message }
}

module.exports = {
  getArnieQuotes,
};
