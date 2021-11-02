module.exports = {
  columns: ['name'],
  sections: {
    props: {
      title: 'Properties',
    },
  },
  elements: {
    'src/components/**': {
      sections: {
        props: {
          hidden: true,
        },
      },
    },
  },
};
