import jsStringEscape from 'js-string-escape';
import {
  PropType,
  hasValue,
  isUndefinedProp,
  isNullProp,
  isVoidProp,
  isStringProp,
  isEnumProp,
  isUnionProp,
} from '@structured-types/api';

export const getPropValue = (prop: PropType): string | undefined => {
  if (hasValue(prop) && prop.value !== undefined) {
    const value = prop.value;
    return typeof value === 'string' &&
      (isStringProp(prop) || isEnumProp(prop) || isUnionProp(prop))
      ? `"${jsStringEscape(prop.value)}"`
      : value.toString();
  } else if (isNullProp(prop)) {
    return 'null';
  } else if (isUndefinedProp(prop)) {
    return 'undefined';
  } else if (isVoidProp(prop)) {
    return 'void';
  }
  return undefined;
};
