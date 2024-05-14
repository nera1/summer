function sortMetadataArrayByCreationDate(array) {
  array.sort((prev, next) => prev.creation - next.creation);
}

function createDictionaryAndIDs(array) {
  const dictionary = {};
  const idList = [];
  for (const index in array) {
    dictionary[index] = array[index];
    idList.push(index);
  }
  return { dictionary, idList };
}

module.exports = {
  sortMetadataArrayByCreationDate,
  createDictionaryAndIDs,
};
