import { UserData } from "./UserData";

export const CheckRoles = (name_role) => {
  const User = UserData();

  let permission = false;

  User?.roles?.map((role) => {
    if (role.includes(name_role)) {
      permission = true;
    }
    return null;
  });

  return permission;
};
