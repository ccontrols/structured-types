module.exports = {
  sections: {
    title: {
      title: 'Component',
      render: (prop) => [
        {
          kind: 5,
          children: [{ kind: 6, value: `The Name is: ${prop.name}` }],
        },
      ],
    },
    type: {
      hidden: true,
      title: 'Types',
    },
    location: {
      title: 'location',
    },
    props: {
      title: 'Custom Properties',
    },
    description: {
      title: 'description',
    },
    examples: {
      title: (prop) =>
        prop.examples && prop.examples.length > 1 ? 'Samples' : 'Sample',
    },
    custom: {
      title: 'Hello',
      render: (prop) => [
        {
          kind: 5,
          children: [{ kind: 6, value: `The Name is: ${prop.name}` }],
        },
      ],
    },
  },
};
