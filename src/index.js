const runETL = require('./etl');

async function main() {
	const args = process.argv.slice(2); // skip `node` and script name
	if (args.length === 0) {
		console.error('Please provide a query name as an argument.');
		process.exit(1);
	}
	const queryName = args[0];

	try {
		await runETL(queryName);
	} catch (err) {
		console.error('ETL process failed:', err);
		process.exit(1);
	}
}

main();
