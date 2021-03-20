import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router';

import { Modal, ModalProps } from './Modal';

type Props = Omit<ModalProps, 'children'> & {
  id: string;
  name: string;
  type: string;
};

export function ModalTag(props: Props) {
  let { type, name, id } = props;
  let history = useHistory();
  return (
    <Modal {...props}>
      <View style={styles.root}>
        <Text>{name}</Text>
        <Button
          onClick={() => {
            history.push({
              pathname: '/filter',
              state: {
                type,
                id,
              },
            });
          }}
          color="primary"
        >
          See More Pokemons with this {type}
        </Button>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'column',
  },
});
