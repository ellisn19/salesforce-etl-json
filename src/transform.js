// src/transform.js
const queries = require('../config/queries.json');

/**
 * Transforms a Salesforce record into a new object based on a field mapping for the given query name.
 *
 * @param {Object} record - The Salesforce record to transform.
 * @param {string} queryName - The name of the query to determine the field mapping.
 * @returns {Object} The transformed record with mapped fields.
 * @throws {Error} If the record is invalid, queryName is missing, or no field mapping is found.
 */
function transformRecord(record, queryName) {
	if (!record || typeof record !== 'object') {
		throw new Error('Invalid record provided for transformation.');
	}
	if (!queryName) {
		throw new Error('Query name is required for transformation.');
	}
	const map = queries[queryName].fieldMap;
	if (!map) {
		throw new Error(`No field mapping found for object: ${queryName}`);
	}
	const output = {};

	for (const [outField, sfFields] of Object.entries(map)) {
		if (Array.isArray(sfFields)) {
			output[outField] = sfFields
				.map((f) => record[f] || '')
				.join(' ')
				.trim();
		} else {
			output[outField] = record[sfFields];
		}
	}

	return output;
}

module.exports = {
	transformRecord,
};
