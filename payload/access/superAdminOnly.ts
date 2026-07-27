import type { Access } from "payload";

export const superAdminOnly: Access = ({ req: { user } }) => user?.role === "admin";
