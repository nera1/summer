function sortMetadataArrayByCreationDate(array) {
  array.sort((prev, next) => prev.creation - next.creation);
}

function createDictionaryAndIDs(array) {
  const dictionary = {};
  const idList = [];
  for (const index in array) {
    array[index].id = index;
    dictionary[index] = array[index];
    idList.push(index);
  }
  return { dictionary, idList };
}

function createTagMap(array) {
  const tagMap = {};
  for (const item of array) {
    const tagList = item["tags"];
    if (tagList !== undefined) {
      for (const tag of tagList) {
        const id = item["id"];
        if (tagMap[tag] == undefined) {
          tagMap[tag] = [id];
        } else {
          tagMap[tag].push(id);
        }
      }
    }
  }
  return tagMap;
}

function createTitleList(array) {
  const titleList = [];
  for (const item of array) {
    const title = item["title"];
    if (title) {
      titleList.push({
        id: item["id"],
        title: title.toLowerCase(),
        category: item["category"],
      });
    }
  }
  return titleList;
}

function createCategoryMap(array) {
  const categoryMap = {};
  for (const item of array) {
    let category = item["category"];
    if (category) {
      const id = item["id"];
      category = category.toLowerCase();
      if (categoryMap[category]) {
        categoryMap[category].push(id);
      } else {
        categoryMap[category] = [id];
      }
    }
  }
  return categoryMap;
}

module.exports = {
  sortMetadataArrayByCreationDate,
  createDictionaryAndIDs,
  createTagMap,
  createTitleList,
  createCategoryMap,
};
