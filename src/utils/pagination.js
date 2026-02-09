exports.getCursorQuery = (cursor) => {
  if (!cursor) return {};
  return { _id: { $gt: cursor } };
};
