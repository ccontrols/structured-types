type Site = {
  url: string;
};

export const urls = {
  social: {
    google: { url: 'https://google.com' } as Site,
    facebook: <Site>{ url: 'https://facebook.com' },
  },
};
