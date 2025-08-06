# salesforce-etl-json

Extract, transform, and export Salesforce data to JSON using Node.js.

## Overview

This is a simple ETL tool that connects to Salesforce, retrieves data from objects like Contact, applies custom transformations, and outputs the results as JSON files. It’s designed to be lightweight and easy to extend.

## Features

- Extracts Salesforce records using SOQL
- Transforms data with customizable mapping functions
- Outputs JSON files for use in other systems or workflows

## Setup

1. Clone the repo:

   ```bash
   git clone https://github.com/yourusername/salesforce-etl-json.git
   cd salesforce-etl-json
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure your Salesforce credentials:

   Update the `alias` property in `config/org.json` to match your org's alias.

4. Create an output directory in the root folder:

   ```bash
   mkdir output
   ```

## Usage

Run the ETL process with:

```bash
npm start --<queryName>
```

This will:

- Execute the defined query

- Transform them according to your mapping logic

- Write the output to `output/<queryName>.json`

Project Structure

```
salesforce-etl-json/
├── output/           # JSON output files
├── config/           # Config
│ ├── org.json        # Org Config
│ ├── queries.json    # Queries Config
├── src/
│ ├── index.js        # Entry point
│ ├── etl.js          # ETL orchestration
│ ├── sfdxExtract.js  # Salesforce query logic
│ └── transform.js    # Data transformation functions
├── package.json
├── README.md
└── .gitignore
```

## Extending

- Add support for other Salesforce objects by modifying the SOQL query in `etl.js`

- Enhance transformations in `transform.js`

- Secure credentials using environment variables or secret managers instead of hardcoding

- Support other output formats (CSV, databases, APIs)

## License

TBD

Feel free to reach out if you want help adding features or improving security!
