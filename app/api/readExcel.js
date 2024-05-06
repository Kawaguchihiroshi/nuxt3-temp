import { parse } from "node-xlsx"
import fs from "fs"

export default async function (req, res) {
  const filePath = "path/to/your/excel/file.xlsx"
  const buffer = fs.readFileSync(filePath)
  const workSheets = parse(buffer)
  res.json({ data: workSheets })
}
