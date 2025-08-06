// src/etl.js
const fs = require('fs');
const path = require('path');
const { getSalesforceConnection } = require('./salesforce');
const { transformRecord } = require('./transform');

async function runETL() {
	const conn = await getSalesforceConnection();

	// Extract
	const records = await conn
		.sobject('Contact')
		.find({}, [
			'Id',
			'FirstName',
			'LastName',
			'Email',
			'Phone',
			'CreatedDate',
			'IsActive',
		])
		.limit(100)
		.execute();

	console.log(`Extracted ${records.length} records.`);

	// Transform
	const transformed = records.map(transformRecord);

	// Load - write JSON to output folder
	const outputDir = path.resolve(__dirname, '..', 'output');
	if (!fs.existsSync(outputDir)) {
		fs.mkdirSync(outputDir);
	}
	const outputPath = path.join(outputDir, 'contacts.json');
	fs.writeFileSync(outputPath, JSON.stringify(transformed, null, 2));

	console.log(`Transformed data written to ${outputPath}`);
}

module.exports = runETL;
