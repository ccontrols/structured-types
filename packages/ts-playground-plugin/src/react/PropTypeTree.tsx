import React, { FC, useState, ReactNode } from 'react';
import { PropType, PropKind } from '@structured-types/api';

export type PropTypeTreeProps = { data: PropType; name?: string };
const propValue = (name: string, value: any): ReactNode => {
  switch (typeof value) {
    case 'string':
      return <span className="ast-node-string">{value}</span>;
    case 'undefined':
      return <span className="ast-node-undefined">undefined</span>;
    case 'boolean':
      return <span className="ast-node-boolean">{value.toString()}</span>;

    case 'bigint':
    case 'number':
      const getValue = () => {
        if (name === 'kind') {
          const typename = PropKind[value as number];
          if (typename) {
            return `${typename} (${value})`;
          }
        }
        return value;
      };
      return <span className="ast-node-number">{getValue()}</span>;
    case 'object': {
      if (Array.isArray(value)) {
        return (
          <div>
            {value.map((v, idx) => (
              <div key={v.name || idx}>
                <PropTypeTree data={v} name={v.name || idx.toString()} />
              </div>
            ))}
          </div>
        );
      }
      if (name === 'returns') {
        return <PropTypeTree data={value} name={name} />;
      }
      return (
        <div>
          {Object.keys(value).map((key) => (
            <PropTypeTree key={key} data={value[key]} />
          ))}
        </div>
      );
    }

    default:
      return null;
  }
};
export const PropTypeTree: FC<PropTypeTreeProps> = ({ data, name }) => {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`ast-tree-start ${open ? 'open' : ''}`}
      data-pos="0"
      data-end="127"
      data-depth="0"
    >
      {name && (
        <a className="node-name" onClick={() => setOpen(!open)}>
          {name}
        </a>
      )}
      <ul className="ast-tree">
        {Array.isArray(data)
          ? data.map((row, idx) => (
              <li key={idx}>
                <PropTypeTree data={row} name={idx.toString()} />
              </li>
            ))
          : Object.keys(data).map((key) => (
              <li key={key}>
                {`${key}${
                  Array.isArray((data as any)[key])
                    ? ` (${(data as any)[key].length})`
                    : ''
                }: `}
                {propValue(
                  key,
                  typeof data === 'object' ? (data as any)[key] : data,
                )}
              </li>
            ))}
      </ul>
    </div>
  );
};
