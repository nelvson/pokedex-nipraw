import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Switch, Route } from 'react-router-dom';

import { routes } from './RouteList';

export default function MainRoute() {
  return (
    <Switch>
      {routes.map((route, index) => {
        return (
          <Route
            key={String(route.path)}
            path={route.path}
            exact={route.exact}
            render={() => {
              let Component = route.component as React.ElementType;

              return (
                <View style={styles.container} key={index}>
                  <View style={styles.contentWrapper}>
                    <Component />
                  </View>
                </View>
              );
            }}
          />
        );
      })}
    </Switch>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  contentWrapper: {
    flex: 1,
    backgroundColor: '#FFF',
  },
});
