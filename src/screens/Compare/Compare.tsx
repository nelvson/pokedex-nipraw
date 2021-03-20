import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { useLocation } from 'react-router';
import { TextField } from '@material-ui/core';
import { Cancel } from '@material-ui/icons';

import { BasicInformation, PokemonStats } from '../Detail/hooks';
import { DetailPokemon } from './hooks';
import {
  ImageDetail,
  MoveTag,
  ProgressBar,
  TypeTag,
} from '../../general/components';
import { ProgressBarStat, PROGRESS_BAR } from '../../general/constants/colors';

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

const EmptyTagSpace = () => <View style={{ height: 24 }} />;

export default function Compare() {
  let locationState = useLocation().state as Maybe<{
    id: string;
  }>;

  let [arrayIds, setArrayIds] = useState<Array<string>>(['', '', '']);
  let { detail: detailQuery } = DetailPokemon(arrayIds);

  let mergedTypes: Array<{ slot: number; type: BasicInformation }> = [];
  let mergedMoves: Array<{ move: BasicInformation }> = [];

  useEffect(() => {
    function mountState() {
      if (locationState) {
        setArrayIds([locationState.id, '', '']);
      }
    }

    mountState();
  }, [locationState]);

  if (detailQuery) {
    // merging array of types & moves
    if (detailQuery[0].abilities !== undefined) {
      let { types, moves } = detailQuery[0];
      types.forEach((datum) => {
        if (
          mergedTypes.findIndex((type) => type.type.url === datum.type.url) ===
          -1
        ) {
          mergedTypes.push(datum);
        }
      });
      moves.forEach((datum) => {
        if (
          mergedMoves.findIndex((type) => type.move.url === datum.move.url) ===
          -1
        ) {
          mergedMoves.push(datum);
        }
      });
    }
    if (detailQuery[1].abilities !== undefined) {
      let { types, moves } = detailQuery[1];
      types.forEach((datum) => {
        if (
          mergedTypes.findIndex((type) => type.type.url === datum.type.url) ===
          -1
        ) {
          mergedTypes.push(datum);
        }
      });
      moves.forEach((datum) => {
        if (
          mergedMoves.findIndex((type) => type.move.url === datum.move.url) ===
          -1
        ) {
          mergedMoves.push(datum);
        }
      });
    }
    if (detailQuery[2].abilities !== undefined) {
      let { types, moves } = detailQuery[2];
      types.forEach((datum) => {
        if (
          mergedTypes.findIndex((type) => type.type.url === datum.type.url) ===
          -1
        ) {
          mergedTypes.push(datum);
        }
      });
      moves.forEach((datum) => {
        if (
          mergedMoves.findIndex((type) => type.move.url === datum.move.url) ===
          -1
        ) {
          mergedMoves.push(datum);
        }
      });
    }
    // end of merging array of types & moves
  }
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

            {detailQuery![0].stats.map(({ base_stat, stat: { name } }) => {
              let barColor = PROGRESS_BAR.STAT[name as ProgressBarStat];
              return (
                <ProgressBar
                  text={name}
                  progressValue={base_stat / 200}
                  withAnimation
                  barColor={barColor}
                />
              );
            })}

            <Text>Type:</Text>
            {mergedTypes.map((datum) => {
              if (
                detailQuery![0].types.findIndex(
                  (detailQueryType) =>
                    detailQueryType.type.url === datum.type.url,
                ) === -1
              ) {
                return <EmptyTagSpace />;
              } else {
                return <TypeTag text={datum.type.name} />;
              }
            })}

            <Text>Move:</Text>
            {mergedMoves.map((datum) => {
              if (
                detailQuery![0].moves.findIndex(
                  (detailQueryMove) =>
                    detailQueryMove.move.url === datum.move.url,
                ) === -1
              ) {
                return <EmptyTagSpace />;
              } else {
                return <MoveTag text={datum.move.name} />;
              }
            })}
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

            {detailQuery![1].stats.map(({ base_stat, stat: { name } }) => {
              let barColor = PROGRESS_BAR.STAT[name as ProgressBarStat];
              return (
                <ProgressBar
                  text={name}
                  progressValue={base_stat / 200}
                  withAnimation
                  barColor={barColor}
                />
              );
            })}

            <Text>Type:</Text>
            {mergedTypes.map((datum) => {
              if (
                detailQuery![1].types.findIndex(
                  (detailQueryType) =>
                    detailQueryType.type.url === datum.type.url,
                ) === -1
              ) {
                return <EmptyTagSpace />;
                //
              } else {
                return <TypeTag text={datum.type.name} />;
              }
            })}

            <Text>Move:</Text>
            {mergedMoves.map((datum) => {
              if (
                detailQuery![1].moves.findIndex(
                  (detailQueryMove) =>
                    detailQueryMove.move.url === datum.move.url,
                ) === -1
              ) {
                return <EmptyTagSpace />;
              } else {
                return <MoveTag text={datum.move.name} />;
              }
            })}
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

            {detailQuery![2].stats.map(({ base_stat, stat: { name } }) => {
              let barColor = PROGRESS_BAR.STAT[name as ProgressBarStat];
              return (
                <ProgressBar
                  text={name}
                  progressValue={base_stat / 200}
                  withAnimation
                  barColor={barColor}
                />
              );
            })}

            <Text>Type:</Text>
            {mergedTypes.map((datum) => {
              if (
                detailQuery![2].types.findIndex(
                  (detailQueryType) =>
                    detailQueryType.type.url === datum.type.url,
                ) === -1
              ) {
                return <EmptyTagSpace />;
              } else {
                return <TypeTag text={datum.type.name} />;
              }
            })}

            <Text>Move:</Text>
            {mergedMoves.map((datum) => {
              if (
                detailQuery![2].moves.findIndex(
                  (detailQueryMove) =>
                    detailQueryMove.move.url === datum.move.url,
                ) === -1
              ) {
                return <EmptyTagSpace />;
              } else {
                return <MoveTag text={datum.move.name} />;
              }
            })}
          </>
        )}
      </View>

      <View>
        <Text>Win Fight Probability:</Text>
        <Text>
          ps: probability calculation: gede2an stats HP, attack, defense,
          special attack/defense, speed :)
        </Text>
        <Text>
          Couldn't get any reference on API nor anywhere else with a win rate prediction formula
        </Text>

        {detailQuery && detailQuery[0].abilities && detailQuery[1].abilities && (
          <View style={styles.probWrapper}>
            <Text>
              {detailQuery[0].name} win Probability:{' '}
              {
                winProbability(detailQuery[0].stats, detailQuery[1].stats)
                  .poke1Win
              }{' '}
              %
            </Text>

            <Text>
              Draw Probability:{' '}
              {winProbability(detailQuery[0].stats, detailQuery[1].stats).draw}{' '}
              %
            </Text>

            <Text>
              {detailQuery[1].name} win Probability:{' '}
              {100 -
                winProbability(detailQuery[0].stats, detailQuery[1].stats)
                  .poke1Win}{' '}
              %
            </Text>
          </View>
        )}

        {detailQuery && detailQuery[0].abilities && detailQuery[2].abilities && (
          <View style={styles.probWrapper}>
            <Text>
              {detailQuery[0].name} win Probability:{' '}
              {
                winProbability(detailQuery[0].stats, detailQuery[2].stats)
                  .poke1Win
              }{' '}
              %
            </Text>

            <Text>
              Draw Probability:{' '}
              {winProbability(detailQuery[0].stats, detailQuery[2].stats).draw}{' '}
              %
            </Text>

            <Text>
              {detailQuery[2].name} win Probability:{' '}
              {100 -
                winProbability(detailQuery[0].stats, detailQuery[2].stats)
                  .poke1Win}{' '}
              %
            </Text>
          </View>
        )}

        {detailQuery && detailQuery[1].abilities && detailQuery[2].abilities && (
          <View style={styles.probWrapper}>
            <Text>
              {detailQuery[1].name} win Probability:{' '}
              {
                winProbability(detailQuery[1].stats, detailQuery[2].stats)
                  .poke1Win
              }{' '}
              %
            </Text>

            <Text>
              Draw Probability:{' '}
              {winProbability(detailQuery[1].stats, detailQuery[2].stats).draw}{' '}
              %
            </Text>

            <Text>
              {detailQuery[2].name} win Probability:{' '}
              {100 -
                winProbability(detailQuery[1].stats, detailQuery[2].stats)
                  .poke1Win}{' '}
              %
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}

function winProbability(poke1: PokemonStats, poke2: PokemonStats) {
  let poke1Win = 0;
  let draw = 0;

  poke1.forEach((datum, idx) => {
    let { base_stat } = datum;
    if (base_stat > poke2[idx].base_stat) poke1Win++;
    else if (base_stat === poke2[idx].base_stat) draw++;
  });

  return {
    poke1Win: (poke1Win / 6) * 100,
    draw: (draw / 6) * 100,
  };
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
  probWrapper: {
    paddingVertical: 20,
  },
});
