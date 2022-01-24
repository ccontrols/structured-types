interface Person {
  title: string;
  name?: {
    first?: string;
    family?: string;
  };
}

export default {
  title: 'Mr',
  name: {
    first: 'John',
  },
} as Person;
