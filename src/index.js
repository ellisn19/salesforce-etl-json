// index.js
const runETL = require('./src/etl');

(async () => {
	try {
		await runETL();
		console.log('ETL process completed successfully.');
	} catch (error) {
		console.error('ETL process failed:', error);
		process.exit(1);
	}
})();
