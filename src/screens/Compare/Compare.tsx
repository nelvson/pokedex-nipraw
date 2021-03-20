import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { useLocation } from 'react-router';
import { TextField } from '@material-ui/core';
import { Cancel } from '@material-ui/icons';

import { BasicInformation, DetailResult } from '../Detail/hooks';
import { DetailPokemon } from './hooks';
import { ImageDetail, MoveTag, TypeTag } from '../../general/components';

const TextEntry = (props: {
  arr: Array<string>;
  onKeyPress: Function;
  index: number;
}) => {
  let { arr, onKeyPress, index } = props;
  let [text, setText] = useState(arr[index]);
  return (
    <View style={styles.textEntry}>
      <TextField
        onKeyPress={(event) => {
          if (event.key === 'Enter') {
            let newArr = [...arr.slice(0, index)];
            newArr.push(text);
            newArr.push(...arr.slice(index + 1, 3));
            onKeyPress(newArr);
          }
        }}
        value={text}
        onChange={(event) => setText(event.target.value)}
      />
      <Cancel
        style={{ color: '#d21404' }}
        onClick={() => {
          let newArr = [...arr.slice(0, index)];
          newArr.push('');
          newArr.push(...arr.slice(index + 1, 3));
          onKeyPress(newArr);
          setText('');
        }}
      />
    </View>
  );
};

export default function Compare() {
  let locationState = useLocation().state as Maybe<{
    id: string;
  }>;

  let [arrayIds, setArrayIds] = useState<Array<string>>(['', '', '']);
  let [detailState, setDetail] = useState<Array<DetailResult>>([]);
  let [isMounted, setMounted] = useState(false);
  let { detail: detailQuery } = DetailPokemon(arrayIds);

  let mergedTypes: Array<{ slot: number; type: BasicInformation }> = [];

  useEffect(() => {
    function mountState() {
      if (locationState) {
        setArrayIds([locationState.id]);
      }
    }

    mountState();
    setMounted(true);
  }, [locationState]);

  if (detailQuery) {
    if (detailQuery[0].abilities !== undefined) {
      let { types } = detailQuery[0];
      types.forEach((datum) => {
        if (
          mergedTypes.findIndex((type) => type.type.url === datum.type.url) ===
          -1
        ) {
          mergedTypes.push(datum);
        }
      });
    }
    if (detailQuery[1].abilities !== undefined) {
      let { types } = detailQuery[1];
      types.forEach((datum) => {
        if (
          mergedTypes.findIndex((type) => type.type.url === datum.type.url) ===
          -1
        ) {
          mergedTypes.push(datum);
        }
      });
    }
    if (detailQuery[2].abilities !== undefined) {
      let { types } = detailQuery[2];
      types.forEach((datum) => {
        if (
          mergedTypes.findIndex((type) => type.type.url === datum.type.url) ===
          -1
        ) {
          mergedTypes.push(datum);
        }
      });
    }
  }
  console.log(mergedTypes);
  return (
    <View style={styles.root}>
      <View style={styles.rowPokemon}>
        <TextEntry onKeyPress={setArrayIds} arr={arrayIds} index={0} />

        {detailQuery && detailQuery[0].abilities !== undefined && (
          <>
            <ImageDetail
              index={detailQuery[0].id}
              name={detailQuery[0].name}
              weight={detailQuery[0].weight}
            />

            <Text>Type:</Text>
            {mergedTypes.map((datum) => {
              if (
                detailQuery![0].types.findIndex(
                  (detailQueryType) =>
                    detailQueryType.type.url === datum.type.url,
                ) === -1
              ) {
                return <View style={{height: 24}} />;
                //
              } else {
                return <TypeTag text={datum.type.name} />;
                //
              }
            })}

            <Text>Move:</Text>
            {detailQuery[0].moves.map((datum) => (
              <MoveTag text={datum.move.name} />
            ))}
          </>
        )}
      </View>

      <View style={styles.rowPokemon}>
        <TextEntry onKeyPress={setArrayIds} arr={arrayIds} index={1} />
        {detailQuery && detailQuery[1].abilities !== undefined && (
          <>
            <ImageDetail
              index={detailQuery[1].id}
              name={detailQuery[1].name}
              weight={detailQuery[1].weight}
            />

            <Text>Type:</Text>
            {mergedTypes.map((datum) => {
              if (
                detailQuery![1].types.findIndex(
                  (detailQueryType) =>
                    detailQueryType.type.url === datum.type.url,
                ) === -1
              ) {
                return <View style={{height: 24}} />;
                //
              } else {
                return <TypeTag text={datum.type.name} />;
                //
              }
            })}

            <Text>Move:</Text>
            {detailQuery[1].moves.map((datum) => (
              <MoveTag text={datum.move.name} />
            ))}
          </>
        )}
      </View>

      <View style={styles.rowPokemon}>
        <TextEntry onKeyPress={setArrayIds} arr={arrayIds} index={2} />
        {detailQuery && detailQuery[2].abilities !== undefined && (
          <>
            <ImageDetail
              index={detailQuery[2].id}
              name={detailQuery[2].name}
              weight={detailQuery[2].weight}
            />

            <Text>Type:</Text>
            {mergedTypes.map((datum) => {
              if (
                detailQuery![1].types.findIndex(
                  (detailQueryType) =>
                    detailQueryType.type.url === datum.type.url,
                ) === -1
              ) {
                return <View style={{height: 24}} />;
                //
              } else {
                return <TypeTag text={datum.type.name} />;
                //
              }
            })}

            <Text>Move:</Text>
            {detailQuery[2].moves.map((datum) => (
              <MoveTag text={datum.move.name} />
            ))}
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
  },
  rowPokemon: {
    borderRightWidth: 1,
  },
  textEntry: {
    flexDirection: 'row',
  },
});

//  Promise.all(
//    arrayIds.map(async (arrayId, index) => {
//      if (arrayId !== '') {
//        let { detail: detailQuery, error, isLoading } = DetailPokemon(arrayId);
//        if (detailQuery && !isLoading && !error) {
//          let newArr = [...detail.slice(0, index)];
//          newArr.push(detailQuery);
//          newArr.push(...detail.slice(index + 1, 3));
//
//          setDetail(newArr);
//        }
//      }
//    }),
//  );
