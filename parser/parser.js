const fs = require("fs");
const yaml = require("js-yaml");
const path = require("path");

const yamlPattern = /^---[\s\S]+?---/;

const {
  sortMetadataArrayByCreationDate,
  createDictionaryAndIDs,
  createTagMap,
  createTitleList,
  createCategoryMap,
} = require("./lib");

const fields = ["tags", "category", "created", "modified", "author", "title"];
const mdSrcfolderPath = path.join(process.cwd(), "src", "md");
const dbDestPath = path.join(process.cwd(), "src", "data");
const dbFileName = "db.json";

const mdList = fs
  .readdirSync(mdSrcfolderPath)
  .filter((filename) => filename.match(/[.md]$/g));

const db = {};
const metadataArray = [];

for (const filename of mdList) {
  const meta = {};
  meta["filename"] = filename;
  const filePath = path.join(mdSrcfolderPath, filename);
  const stats = fs.statSync(filePath);
  meta["created"] = stats.birthtime;
  meta["modified"] = stats.mtime;
  const fileContent = fs.readFileSync(filePath).toString().trim();
  const match = fileContent.match(yamlPattern);
  if (match) {
    const yamlstr = match[0].replace(/^---s*|---s*$/g, "").trim();
    const yamlData = yaml.load(yamlstr);
    for (const field of fields) {
      if (yamlData[field] !== undefined) {
        meta[field] = yamlData[field];
      }
    }
  }
  metadataArray.push(meta);
}

sortMetadataArrayByCreationDate(metadataArray);

const { dictionary, idList } = createDictionaryAndIDs(metadataArray);

db["dictionary"] = dictionary;
db["list"] = idList;
db["tags"] = createTagMap(metadataArray);
db["titles"] = createTitleList(metadataArray);
db["categories"] = createCategoryMap(metadataArray);

fs.writeFileSync(
  path.join(dbDestPath, dbFileName),
  JSON.stringify(db),
  (err) => {
    throw err;
  }
);
