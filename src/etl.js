// src/etl.js
const fs = require('fs');
const path = require('path');
const { fetchSalesforceRecords } = require('./sfdxExtract');
const { transformRecord } = require('./transform');

async function runETL() {
	const soql = 'SELECT Id, Name, Phone, CreatedDate FROM Account LIMIT 100';
	const records = fetchSalesforceRecords(soql);

	if (!records.length) {
		console.log('No records returned.');
		return;
	}

	const transformed = records.map(transformRecord);

	const outputDir = path.resolve(__dirname, '..', 'output');
	if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

	fs.writeFileSync(
		path.join(outputDir, 'contacts.json'),
		JSON.stringify(transformed, null, 2)
	);

	console.log(`Extracted and transformed ${records.length} records.`);
}

module.exports = runETL;
