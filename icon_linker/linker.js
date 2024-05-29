const fs = require("fs");
const path = require("path");
const { distance, closest } = require("fastest-levenshtein");

const { categories } = require("../src/data/db.json");

const linkDestPath = path.join(process.cwd(), "src", "data");
const linkFilename = "icon_link.json";

const defaultIcon = "cube.svg";

const categoryList = Object.keys(categories);

const categoryIconLink = {};

const iconFileList = fs.readdirSync(
  path.join(process.cwd(), "public", "icons")
);
const iconFilenameList = iconFileList.map((item) => item.split(".")[0]);
const iconfilePairMap = iconFileList.reduce((acc, cur) => {
  const [filename] = cur.split(".");
  acc[filename] = cur;
  return acc;
}, {});

for (const category of categoryList) {
  const iconfilename = closest(category, iconFilenameList);
  const dist = distance(category, iconfilename);
  categoryIconLink[category] =
    dist >= category.length / 2 ? defaultIcon : iconfilePairMap[iconfilename];
}

categoryIconLink["default"] = defaultIcon;

fs.writeFileSync(
  path.join(linkDestPath, linkFilename),
  JSON.stringify(categoryIconLink),
  (err) => {
    throw err;
  }
);
