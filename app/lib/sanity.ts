import { createClient } from "@sanity/client";

export const sanity = createClient({
  projectId: "cf4vn58a",
  dataset: "production",
  apiVersion: "2021-10-21",
  useCdn: false,
});