// src/etl.js
const fs = require('fs');
const path = require('path');
const { fetchSalesforceRecords } = require('./sfdxExtract');
const { transformRecord } = require('./transform');
const queries = require('../config/queries.json');

async function runETL(queryName) {
	// const queryName = 'AccountTestQuery';
	if (!queries[queryName]) {
		throw new Error(`No query found for name: ${queryName}`);
	}

	const objectName = queries[queryName].objectName;
	const soql = queries[queryName].query;

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
		path.join(outputDir, queryName + '.json'),
		JSON.stringify(transformed, null, 2)
	);

	console.log(`Extracted and transformed ${records.length} records.`);
}

module.exports = runETL;
