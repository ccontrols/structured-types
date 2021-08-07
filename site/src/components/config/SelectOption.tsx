/** @jsx jsx */
import { FC } from 'react';
import { jsx, Box, Heading, Select, Link } from 'theme-ui';
import { Markdown, Multiselect } from '@component-controls/components';
import { useUpdateOptions } from '../../contexts/OptionsContext';
import { OptionsData, OptionsName } from '../../contexts/options';

export const SelectOption: FC<
  {
    paramName: OptionsName;
    title: string;
  } & OptionsData
> = ({ paramName, title, help, options, value: propValue, defaultValue }) => {
  const value = typeof propValue === 'undefined' ? defaultValue : propValue;
  const updateOption = useUpdateOptions(paramName, title);
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        px: 2,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Heading as="h3" sx={{ pr: 2 }}>
          {`${title}:`}
        </Heading>
        {Array.isArray(defaultValue) ? (
          <Multiselect
            sx={{ width: '200px', display: 'flex' }}
            items={
              options?.map((option) => ({
                label: option,
                selected: (value as string[]).includes(option),
              })) || []
            }
            onChange={(item) => {
              const selected = value as string[];
              const visibleItem = selected.find((name) => name === item.label);
              if (visibleItem) {
                const newItems = selected.filter(
                  (name) => name !== visibleItem,
                );
                updateOption(newItems);
              } else {
                updateOption([...selected, item.label]);
              }
            }}
          >
            <Link
              href="#"
              sx={{
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
              }}
            >
              {(value as string[]).length
                ? (value as string[]).join(', ')
                : 'none'}
            </Link>
          </Multiselect>
        ) : (
          <Select
            aria-label={`select ${title} option`}
            sx={{ minWidth: '150px', py: 1 }}
            value={value as string}
            onChange={(e) => {
              updateOption(e.target.value);
            }}
          >
            {options?.map((option) => (
              <option value={option} key={option}>
                {option}
              </option>
            ))}
          </Select>
        )}
      </Box>
      <div sx={{ '>div': { color: 'mutedText', maxWidth: '400px', my: 1 } }}>
        <Markdown>{help}</Markdown>
      </div>
    </Box>
  );
};
