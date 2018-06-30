const padDate = (date) => date.toString().length === 1 ? "0" + date : date

const rand = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min

const randWord = (length) =>
  Array.from({ length }).map(() => String.fromCharCode(rand(65, 90))).join("")

const randURL = (length) => `http://${randWord(length)}.com`

const randISODate = () =>
  `${rand(1971, 2018)}-${padDate(rand(1, 12))}-${padDate(rand(1, 28))} ${padDate(rand(0, 23))}:${padDate(rand(0, 59))}:${padDate(rand(1, 59))}`
// INSERT INTO urls(full_url, short_url, date_created, created_by)
const randIP = () =>
  `${rand(0, 255)}.${rand(0, 255)}.${rand(0, 255)}.${rand(0, 255)}`

const getRowValues = () =>
  `('${randURL(8)}', '${randURL(4)}', '${randISODate()}', '${randIP()}')`

let output = "INSERT INTO urls(full_url, short_url, date_created, created_by) VALUES \n"
let values = Array.from({ length: 100 }).map(() => getRowValues())

const data = output + values.join(",\n") + ";"
const fs = require("fs")

fs.writeFileSync("./test_data.sql", data, { encoding: "utf8" })