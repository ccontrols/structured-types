interface Person {
  title: string;
  name?: {
    first?: string;
    family?: string;
  };
}
const john: Person = {
  title: 'Mr',
  name: {
    first: 'John',
  },
};

export default john;
