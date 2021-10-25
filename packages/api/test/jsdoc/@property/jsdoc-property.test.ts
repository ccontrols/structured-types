import path from 'path';
import { parseFiles } from '../../../src/index';

describe('@property', () => {
  it('optional', () => {
    const results = parseFiles([path.resolve(__dirname, 'optional.js')]);
    expect(results).toEqual({
      user: {
        name: 'user',
        kind: 26,
        properties: [
          {
            kind: 1,
            name: 'email',
            value: 's',
          },
        ],
        type: 'User',
      },
      User: {
        name: 'User',
        kind: 15,
        properties: [
          {
            kind: 1,
            name: 'email',
          },
          {
            name: 'nickName',
            kind: 1,
            optional: true,
          },
        ],
        description: 'User type definition',
      },
    });
  });
  it('enum', () => {
    const results = parseFiles([path.resolve(__dirname, 'enum.js')]);
    expect(results).toEqual({
      food: {
        name: 'food',
        kind: 26,
        properties: [
          {
            kind: 1,
            name: 'name',
            value: 'beef',
          },
          {
            kind: 1,
            name: 'type',
            value: 'meat',
          },
        ],
        type: 'Food',
      },
      Food: {
        name: 'Food',
        kind: 15,
        properties: [
          {
            kind: 1,
            name: 'name',
            description: 'What the food should be called',
          },
          {
            name: 'type',
            description: "The food's type",
            kind: 4,
            properties: [
              {
                kind: 1,
                value: 'meat',
              },
              {
                kind: 1,
                value: 'veggie',
              },
              {
                kind: 1,
                value: 'other',
              },
            ],
          },
        ],
      },
    });
  });
  it('nested', () => {
    const results = parseFiles([path.resolve(__dirname, 'nested.js')]);
    expect(results).toEqual({
      config: {
        name: 'config',
        kind: 26,
        properties: [
          {
            name: 'defaults',
            kind: 26,
            properties: [
              {
                kind: 2,
                name: 'players',
                value: 1,
              },
              {
                kind: 1,
                name: 'level',
                value: 'beginner',
              },
              {
                name: 'treasure',
                kind: 26,
                properties: [
                  {
                    kind: 2,
                    name: 'gold',
                    value: 0,
                  },
                ],
              },
            ],
          },
        ],
        type: 'Config',
      },
      Config: {
        name: 'Config',
        kind: 15,
        properties: [
          {
            name: 'defaults',
            kind: 15,
            properties: [
              {
                kind: 2,
                name: 'players',
                description: 'The default number of players.',
              },
              {
                kind: 1,
                name: 'level',
                description: 'The default level for the party.',
              },
              {
                name: 'treasure',
                kind: 15,
                properties: [
                  {
                    kind: 2,
                    name: 'gold',
                    description: 'How much gold the party starts with.',
                  },
                ],
                description: 'The default treasure.',
              },
            ],
            description: 'The default values for parties.',
          },
        ],
      },
    });
  });
});
