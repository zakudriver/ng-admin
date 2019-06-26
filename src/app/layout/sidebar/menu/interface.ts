export interface IMenu {
  key: number;
  parentKey?: number;
  name: string;
  icon: string;
  path?: string;
}

export interface IMenuTree extends IMenu {
  children?: IMenu[];
}
