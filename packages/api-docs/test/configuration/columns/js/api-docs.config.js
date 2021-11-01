module.exports = {
  columns: {
    name: {
      title: 'Property',
      render: (name, prop) => {
        if (name === 'name') {
          // custom render the "name" column cells
          return [
            {
              kind: 5,
              children: [{ kind: 6, value: `The Name is: ${prop.name}` }],
            },
          ];
        }
        // all other cells render as default
        return undefined;
      },
    },
    parents: {
      hidden: true,
    },
    description: {
      title: (prop) => `${prop.name} props`,
    },
  },
};
