import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { TextField } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { useHistory } from 'react-router';

const SearchBar = (props: { func: Function }) => {
  let [text, setText] = useState('');
  return (
    <View style={styles.textEntry}>
      <TextField
        onKeyPress={(event) => {
          if (event.key === 'Enter') {
            props.func(`/detail/${text}`);
          }
        }}
        label="Search a pokemon here..."
        value={text}
        style={{ width: 300 }}
        onChange={(event) => setText(event.target.value)}
      />
      <Search onClick={() => props.func(`/detail/${text}`)} />
    </View>
  );
};

export default function Landing() {
  let history = useHistory();

  return (
    <View style={styles.root}>
      <View style={styles.searchBar}>
        <SearchBar func={history.push} />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center', //changed value of alignItems
  },
  textEntry: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
