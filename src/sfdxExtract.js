// src/sfdxExtract.js
const { execSync } = require('child_process');
const { orgConfig } = require('../config/org.json');

function fetchSalesforceRecords(soqlQuery, orgAlias = 'BookWormsOrg') {
	try {
		const raw = execSync(
			`sfdx force:data:soql:query -q "${soqlQuery}" -u ${orgAlias} --json`
		);
		const parsed = JSON.parse(raw.toString());
		return parsed.result.records;
	} catch (err) {
		console.error('Failed to fetch data from Salesforce:', err.message);
		return [];
	}
}

module.exports = { fetchSalesforceRecords };
