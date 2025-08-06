// src/salesforce.js
const jsforce = require('jsforce');

// Simulated async fetch of credentials; replace with real secret management
async function getCredsFromSalesforce() {
	return {
		username: 'YOUR_USERNAME',
		password: 'YOUR_PASSWORD',
		token: 'YOUR_SECURITY_TOKEN',
		loginUrl: 'https://login.salesforce.com',
	};
}

async function getSalesforceConnection() {
	const creds = await getCredsFromSalesforce();
	const conn = new jsforce.Connection({
		loginUrl: creds.loginUrl,
	});

	await conn.login(creds.username, creds.password + creds.token);
	console.log('Logged into Salesforce.');

	return conn;
}

module.exports = {
	getSalesforceConnection,
};
