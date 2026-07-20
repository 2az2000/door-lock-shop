import type { Access } from "payload";

export const adminOnly: Access = ({ req: { user } }) => Boolean(user);
