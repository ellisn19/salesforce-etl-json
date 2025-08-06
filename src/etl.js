// src/etl.js
const fs = require('fs');
const path = require('path');
const { fetchSalesforceRecords } = require('./sfdxExtract');
const { transformRecord } = require('./transform');
const queries = require('../config/queries.json');

/**
 * Executes an ETL (Extract, Transform, Load) process for a specified Salesforce query.
 * Fetches records using the provided query name, transforms them, and writes the output to a JSON file.
 *
 * @async
 * @param {string} queryName - The name of the query to execute from the queries object.
 * @throws {Error} If no query is found for the provided queryName.
 */
async function runETL(queryName) {
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
		transformRecord(record, queryName)
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
