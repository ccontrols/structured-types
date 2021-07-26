/** @jsx jsx */
import { FC } from 'react';
import { jsx, Box, Heading, Select } from 'theme-ui';
import { Markdown } from '@component-controls/components';
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
      </Box>
      <div sx={{ '>div': { color: 'mutedText', maxWidth: '400px', my: 1 } }}>
        <Markdown>{help}</Markdown>
      </div>
    </Box>
  );
};
