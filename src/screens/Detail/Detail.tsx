import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { useParams } from 'react-router-dom';

import {
  ImageDetail,
  ProgressBar,
  MoveTag,
  TypeTag,
} from '../../general/components';
import { PROGRESS_BAR, ProgressBarStat } from '../../general/constants/colors';
import { fontSizes } from '../../general/constants/font';

import { DetailPokemon, DetailResult } from './hooks';

type DetailRoute = {
  id: string;
};

export default function Detail() {
  let { id } = useParams() as DetailRoute;
  let { isLoading, detail: queryDetail, error } = DetailPokemon(id);
  const [detail, setDetail] = useState<Maybe<DetailResult>>(null);

  useEffect(() => {
    if (queryDetail && !isLoading) {
      setDetail(queryDetail);
    }
  }, [queryDetail, isLoading]);

  if (error) {
    return <Text>ERROR</Text>;
  }

  if ((isLoading && !error) || !detail) {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.root}>
      <View style={styles.tagDetail}>
        <Text style={styles.textHeader}>Type</Text>
        {detail.types.map((datum) => (
          <TypeTag text={datum.type.name} />
        ))}

        <Text style={styles.textHeader}>Type</Text>
        {detail.moves.map((datum) => (
          <MoveTag text={datum.move.name} />
        ))}
      </View>
      <View style={styles.pokemonDetail}>
        <ImageDetail
          index={id}
          name={detail.name}
          weight={detail.weight}
        />

        {detail.stats.map(({ base_stat, stat: { name } }) => {
          let barColor = PROGRESS_BAR.STAT[name as ProgressBarStat];
          return (
            <ProgressBar
              text={name}
              progressValue={base_stat / 100}
              withAnimation
              barColor={barColor}
            />
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  tagDetail: {
    flex: 3,
    paddingHorizontal: 20,
  },
  pokemonDetail: {
    flex: 1,
    paddingHorizontal: 20,
  },
  textHeader: {
    fontSize: fontSizes.l,
  },
});
