import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/Home';
import VideoEditor from '../screens/VideoEditor';
import VideoEdited from '../screens/VideoEdited';

const Stack = createNativeStackNavigator();

const RootNavigate = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="VideoEditor" component={VideoEditor} />
        <Stack.Screen name="VideoEdited" component={VideoEdited} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigate;
