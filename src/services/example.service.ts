const getAll = async () => {
  return "getAll";
};

const createOne = async (exampleCreated: { name: string; description: string }) => {
  return exampleCreated;
};

const updateOne = async (exampleUpdated: { name?: string; description?: string }) => {
  return exampleUpdated;
};

const deleteOne = async () => {
  return "deleteOne";
};

export default {
  getAll,
  createOne,
  updateOne,
  deleteOne,
};
