// src/etl.js
const fs = require('fs');
const path = require('path');
const { fetchSalesforceRecords } = require('./sfdxExtract');
const { transformRecord } = require('./transform');
const queries = require('../config/queries.json');

async function runETL() {
	const objectName = 'Account';
	const soql = queries[objectName];
	if (!soql) {
		throw new Error(`No SOQL query found for object: ${objectName}`);
	}

	const records = fetchSalesforceRecords(soql);

	if (!records.length) {
		console.log('No records returned.');
		return;
	}

	const transformed = records.map((record) =>
		transformRecord(record, objectName)
	);

	const outputDir = path.resolve(__dirname, '..', 'output');
	if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

	fs.writeFileSync(
		path.join(outputDir, 'accounts.json'),
		JSON.stringify(transformed, null, 2)
	);

	console.log(`Extracted and transformed ${records.length} records.`);
}

module.exports = runETL;
