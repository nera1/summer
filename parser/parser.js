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
  yamlHeaderStringGenerator,
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
    if (!meta["title"]) {
      meta["title"] = filename.split(".")[0];
    }
    if (!meta["created"]) {
      meta["created"] = new Date().toUTCString();
    }
  }

  const newYamlHeader = yamlHeaderStringGenerator(yaml.dump(meta));

  const newFileContent = fileContent.replace(yamlPattern, newYamlHeader);
  fs.writeFileSync(filePath, newFileContent);

  metadataArray.push(meta);
}

sortMetadataArrayByCreationDate(metadataArray);

const { dictionary, idList } = createDictionaryAndIDs(metadataArray);

db["dictionary"] = dictionary;
db["list"] = idList;
db["tags"] = createTagMap(metadataArray);
db["titles"] = createTitleList(metadataArray);

const { categoryOriginalMap, categoryMap } = createCategoryMap(metadataArray);

db["categories"] = categoryMap;
db["categoryOrigins"] = categoryOriginalMap;

fs.writeFileSync(
  path.join(dbDestPath, dbFileName),
  JSON.stringify(db),
  (err) => {
    throw err;
  }
);
