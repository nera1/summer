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
    }
  }
}

module.exports = {
  sortMetadataArrayByCreationDate,
  createDictionaryAndIDs,
};
