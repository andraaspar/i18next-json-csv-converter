# i18next-json-csv-converter

Converts i18next format JSON files to CSV (to be imported to Excel) and back.

## Install

```sh
$ npm i -g i18next-json-csv-converter
```

Or with Yarn:

```sh
$ yarn global add i18next-json-csv-converter
```

## CLI

### Convert JSON to CSV

```sh
$ i18next-json-csv-converter ./en-EN.json ./en-EN.csv
```

### Convert CSV to JSON

**Requirements:** Encoding must be UTF-8, separator must be comma ( , ) lines must be separated by line breaks and all fields must be quoted.

```sh
$ i18next-json-csv-converter ./en-EN.csv ./en-EN.json
```

*Note: As of this writing, Excel can't export a proper CSV for this (UTF-8 issues). LibreOffice Calc can.*


## API

### json2Csv(json: object): string

Takes an object parsed from JSON and outputs CSV string.

### csv2Json(csv: string): object

Takes a CSV string and outputs an object ready for stringifying to JSON.

### separator: string = '┊'

The separator used for separating key levels in CSV.

## Known issues

* Line breaks in strings are not currently supported.
* Arrays are not currently supported.

## License

MIT

## Changes

0.1.0 Initial version.

0.1.1 Added license.