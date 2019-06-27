export interface IMenu {
  key: string;
  parentKey?: string;
  name: string;
  icon: string;
  path?: string;
}

export interface IMenuTree extends IMenu {
  children?: IMenu[];
}
