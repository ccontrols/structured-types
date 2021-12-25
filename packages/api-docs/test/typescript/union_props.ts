interface ParentProps {
  name: string;
}

export type ChildProps = {
  age: number;
} & ParentProps;
