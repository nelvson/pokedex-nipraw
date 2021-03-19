import React, { ReactNode, CSSProperties } from 'react';
import { StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { Dialog, DialogContent, makeStyles } from '@material-ui/core';

type Props = {
  children: ReactNode;
  open: boolean;
  onClose: () => void;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  fullWidth?: boolean;
};

export { Props as ModalProps };

const useStyles = makeStyles({
  paperFullWidth: {
    maxWidth: '68%',
  },
});

export function Modal(props: Props) {
  let classes = useStyles();
  let { children, open, style, contentStyle, onClose, fullWidth } = props;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth={fullWidth}
      classes={classes}
      style={StyleSheet.flatten(style) as CSSProperties}
    >
      <DialogContent
        style={
          StyleSheet.flatten([styles.spacing, contentStyle]) as CSSProperties
        }
      >
        {children}
      </DialogContent>
    </Dialog>
  );
}

const styles = StyleSheet.create({
  spacing: {
    padding: 40,
  },
});
