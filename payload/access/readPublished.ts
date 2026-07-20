import type { Access } from "payload";

export const readPublished: Access = ({ req: { user } }) => {
  if (user) return true;

  return {
    published: {
      equals: true,
    },
  };
};
