// src/transform.js
const fieldMap = require('../config/fieldMap.json');

function transformRecord(record, objectName = 'Contact') {
	const map = fieldMap[objectName];
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
