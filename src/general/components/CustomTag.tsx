import React from 'react';
import { TAG } from '../constants/colors';

import { Tag, TagProps } from '../core-ui';

export function TypeTag(props: TagProps) {
  return <Tag {...props} customColor={TAG.types} withDot />;
}

export function MoveTag(props: TagProps) {
  return <Tag {...props} customColor={TAG.move} withDot />;
}
