// src/transform.js
const fieldMap = require('../config/fieldMap.json');

function transformRecord(record, objectName) {
	if (!record || typeof record !== 'object') {
		throw new Error('Invalid record provided for transformation.');
	}
	if (!objectName) {
		throw new Error('Object name is required for transformation.');
	}
	const map = fieldMap[objectName];
	if (!map) {
		throw new Error(`No field mapping found for object: ${objectName}`);
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
