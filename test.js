const test = require('ava')
const { json2Csv, csv2Json, separator, diffCsv } = require('./index.js')

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

test('diffCsv: Finds changes.', t => {
	const a = [
		`"foo","a"`,
		`"bar","b"`,
		`"baz","c"`,
	].join('\n')
	const b = [
		`"nuff","o"`,
		`"foo","d"`,
		`"bar","b"`,
		`"baz","c"`,
		`"quux","e"`,
	].join('\n')
	const result = [
		`"nuff","o","CHANGED"`,
		`"foo","d","CHANGED"`,
		`"bar","b",""`,
		`"baz","c",""`,
		`"quux","e","CHANGED"`,
	].join('\n')
	t.is(diffCsv(a, b), result)
})

test('diffCsv: Uses master.', t => {
	const a = [
		`"foo","a"`,
		`"bar","b"`,
		`"baz","c"`,
	].join('\n')
	const b = [
		`"nuff","o"`,
		`"foo","a"`,
		`"bar","d"`,
		`"baz","c"`,
		`"quux","e"`,
	].join('\n')
	const master = [
		`"nuff","1"`,
		`"foo","2"`,
		`"baz","4"`,
		`"quux","5"`,
	].join('\n')
	const result = [
		`"nuff","o","CHANGED","1"`,
		`"foo","a","","2"`,
		`"bar","d","CHANGED",""`,
		`"baz","c","","4"`,
		`"quux","e","CHANGED","5"`,
	].join('\n')
	t.is(diffCsv(a, b, master), result)
})