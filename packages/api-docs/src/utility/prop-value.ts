import jsStringEscape from 'js-string-escape';
import {
  PropType,
  hasValue,
  isStringProp,
  isUndefinedProp,
  isNullProp,
  isVoidProp,
} from '@structured-types/api';

export const getPropValue = (prop: PropType): string | undefined => {
  if (hasValue(prop) && prop.value !== undefined) {
    return isStringProp(prop)
      ? `"${jsStringEscape(prop.value)}"`
      : prop.value.toString();
  } else if (isNullProp(prop)) {
    return 'null';
  } else if (isUndefinedProp(prop)) {
    return 'undefined';
  } else if (isVoidProp(prop)) {
    return 'void';
  }
  return undefined;
};
