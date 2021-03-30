export interface Todo {
  _id: number;
  content: string;
  checked: boolean
}

export interface Note {
  id: number;
  title: string;
  content?: string;
  todos?: Todo[];
  dateCreated: Date;
  lastUpdated: Date;
  color: {r: Number, g: Number, b: Number, a: Number}
}
