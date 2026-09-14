import { Role } from "@prisma/client";

export type SessionUser = {
  id: string;
  name: string;
  email: string;
  role: Role;
};

export function isAdmin(user?: SessionUser | null) {
  return user?.role === "ADMIN";
}

export function canManageUsers(user?: SessionUser | null) {
  return isAdmin(user);
}

export function canEditSettings(user?: SessionUser | null) {
  return isAdmin(user);
}

export function canManageContent(user?: SessionUser | null) {
  return user?.role === "ADMIN" || user?.role === "EDITOR";
}

export function canDeleteEnquiry(user?: SessionUser | null) {
  return isAdmin(user);
}
