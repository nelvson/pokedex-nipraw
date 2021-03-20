import React, { ChangeEvent } from 'react';
import {
  Checkbox as CCheckBox,
  CheckboxProps,
  FormControlLabel,
  withStyles,
} from '@material-ui/core';

type Props = Omit<CheckboxProps, 'color' | 'onChange'> & {
  disabled?: boolean;
  label?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  color?: {
    border?: string;
    checkedBackground?: string;
  };
};

export function CheckBox(props: Props) {
  let { disabled = false, onChange, label, color, ...restProps } = props;

  const CustomCheckBox = withStyles({
    root: {
      color: color?.border,
      '&$checked': {
        color: color?.checkedBackground,
        borderColor: color?.checkedBackground,
      },
    },
    checked: {},
  })((props: CheckboxProps) => (
    <CCheckBox color="default" {...props} {...restProps} />
  ));

  let checkbox = (
    <CustomCheckBox
      onChange={onChange}
      disabled={disabled}
      inputProps={{ 'aria-label': 'checkbox' }}
    />
  );

  if (label) {
    return <FormControlLabel label={label} control={checkbox} />;
  }

  return checkbox;
}
