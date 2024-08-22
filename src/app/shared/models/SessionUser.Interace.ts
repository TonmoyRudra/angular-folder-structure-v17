export interface ISessionUser {
  logUserID?: string;
  bmUserId?: number;
  hrEmpId?: number;
  appId?: number;
  email?: string;
  token?: string;
  roles?: string[];
  roleIds?: null;
  userMenus?: IUserMenu[];
  menus?: IMenu[];
  isAdmin?: boolean;
  isSuperAdmin?: boolean;
}

export interface IMenu {
  id?: string;
  text?: string;
  icon?: null | string;
  type?: null | string;
  menushortname?: null | string;
  menutooltip?: null | string;
  menudeschelp?: null | string;
  routE_NAME?: string;
  caninsert?: number;
  candelete?: number;
  canupdate?: number;
  appRouteName?: null | string;
  menuGroupRouteName?: null | string;
  path?: null | string;
  expanded?: boolean;
  serialNo?: null;
  items?: IMenu[] | null;
}

export interface IUserMenu {
  text?: string;
  path?: string;
  icon?: null;
}
