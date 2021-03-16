import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { DetailPokemon, DetailResult } from './hooks';
import { Tag } from '../../general/core-ui';
import { ImageDetail, ProgressBar } from '../../general/components';
import { IMAGE_URL } from '../../general/constants/api';
import { PROGRESS_BAR, ProgressBarStat } from '../../general/constants/colors';

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
    console.log(isLoading, detail, queryDetail);
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.root}>
      <View style={styles.tagDetail}>
        <Tag text="asd" />
      </View>
      <View style={styles.pokemonDetail}>
        <ImageDetail
          uri={`${IMAGE_URL}` + id + '.png'}
          name={detail.name}
          weight={detail.weight}
        />

        {detail &&
          detail.stats.map((datum) => {
            let barColor =
              PROGRESS_BAR.STAT[datum.stat.name as ProgressBarStat];
            return (
              <ProgressBar
                text={datum.stat.name}
                progressValue={datum.base_stat / 100}
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
  },
  pokemonDetail: {
    flex: 1,
  },
});
