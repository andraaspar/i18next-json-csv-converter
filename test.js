const test = require('ava')
const { json2Csv, csv2Json, separator } = require('./index.js')

test('json2Csv: Works.', t => {
	const json = {
		"foo": "bar",
		"baz": "quux"
	}
	t.is(json2Csv(json), `"foo","bar"\n"baz","quux"`)
})

test('json2Csv: Supports quotes.', t => {
	const json = {
		"f\"o\"o": "b\"a\"r"
	}
	t.is(json2Csv(json), `"f""o""o","b""a""r"`)
})

test('json2Csv: Supports nesting.', t => {
	const json = {
		"foo": {
			"bar": "baz"
		}
	}
	t.is(json2Csv(json), `"foo${separator}bar","baz"`)
})

test('csv2Json: Works.', t => {
	const json = {
		"foo": "bar",
		"baz": "quux"
	}
	t.deepEqual(csv2Json(`"foo","bar"\n"baz","quux"`), json)
})

test('csv2Json: Supports quotes.', t => {
	const json = {
		"f\"o\"o": "b\"a\"r"
	}
	t.deepEqual(csv2Json(`"f""o""o","b""a""r"`), json)
})

test('csv2Json: Supports nesting.', t => {
	const json = {
		"foo": {
			"bar": "baz"
		}
	}
	t.deepEqual(csv2Json(`"foo${separator}bar","baz"`), json)
})