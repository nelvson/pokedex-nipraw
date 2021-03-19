import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { Modal, ModalProps } from './Modal';

type Props = Omit<ModalProps, 'children'> & {
  id: string;
  name: string;
};

export function ModalTag(props: Props) {
  let { id, name } = props;
  return (
    <Modal {...props}>
      <Text>{id}</Text>
      <Text>{name}</Text>
    </Modal>
  );
}

const styles = StyleSheet.create({
  //
});
