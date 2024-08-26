import { Schema } from "redis-om";

export const ItemCacheSchema = new Schema(
  "item",
  {
    id: {
      type: "string",
    },
    name: {
      type: "string",
    },
    price: {
      type: "number",
    },
    quantity: {
      type: "number",
    },
  },
  {
    dataStructure: "HASH", // HASH or JSON  (default: HASH)
  }
);
