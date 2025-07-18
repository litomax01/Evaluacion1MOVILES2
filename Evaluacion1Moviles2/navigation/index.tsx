
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootStack from './RootStack';

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}
