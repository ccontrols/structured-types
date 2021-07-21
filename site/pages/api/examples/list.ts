import { NextApiRequest, NextApiResponse } from 'next';
import { examples, Examples } from '../../../src/api/examples';

const list = Object.keys(examples).map((name) => ({
  name,
  items: Object.keys(examples[name])
    .filter((key) => typeof (examples[name] as Examples)[key] === 'object')
    .map((key) => ({
      name: key,
      items: Object.keys((examples[name] as Examples)[key]).map((name) => ({
        name,
      })),
    })),
}));
export default async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  res.status(200).json(list);
};
