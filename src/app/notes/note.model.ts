export interface Todo {
  id: number;
  content: string;
  checked: boolean
}

export interface Note {
  id: number;
  title: string;
  content?: string;
  todos?: Todo[]
}
