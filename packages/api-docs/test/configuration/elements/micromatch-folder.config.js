module.exports = {
  columns: ['name'],
  sections: {
    props: {
      title: 'Properties',
    },
  },
  elements: {
    'src/components/*': {
      columns: ['description'],
    },
  },
};
