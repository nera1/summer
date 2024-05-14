const fs = require("fs");
const yaml = require("js-yaml");

const {
  sortMetadataArrayByCreationDate,
  createDictionaryAndIDs,
} = require("./lib");

const mdSrcfolderPath = process.cwd() + `\\src\\md`;
const dbDestPath = process.cwd() + `\\src\\app`;
const dbFileName = "db.json";

const mdList = fs
  .readdirSync(mdSrcfolderPath)
  .filter((filename) => filename.match(/[.md]$/g));

const yamlPattern = /^---[\s\S]+?---/;

const db = {};
const metadataArray = [];

for (const filename of mdList) {
  const meta = {};
  meta["filename"] = filename;
  const filePath = mdSrcfolderPath + "\\" + filename;
  const stats = fs.statSync(filePath);
  meta["creation"] = stats.birthtime;
  meta["modification"] = stats.mtime;
  const fileContent = fs.readFileSync(filePath).toString().trim();
  const match = fileContent.match(yamlPattern);
  if (match) {
    const yamlstr = match[0].replace(/^---s*|---s*$/g, "").trim();
    const yamlData = yaml.load(yamlstr);
  }
  metadataArray.push(meta);
}

sortMetadataArrayByCreationDate(metadataArray);

const { dictionary, idList } = createDictionaryAndIDs(metadataArray);
db["dictionary"] = dictionary;
db["list"] = idList;

fs.writeFileSync(dbDestPath + "\\" + dbFileName, JSON.stringify(db), (err) => {
  throw err;
});
