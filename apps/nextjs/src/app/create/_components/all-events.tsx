"use client";

import { api } from "~/utils/api";

export const AllEvents = () => {
  const [posts] = api.post.all.useSuspenseQuery();

  console.log({ posts });
  return null;
};
