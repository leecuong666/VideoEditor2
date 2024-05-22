import React from 'react';
import 'react-native-get-random-values';
import RootNavigate from './src/navigation/RootNavigate';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {RealmProvider} from '@realm/react';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {MediaEdited, MediaPicker} from './src/database/models';

const App = () => {
  return (
    <RealmProvider
      schema={[MediaPicker, MediaEdited]}
      schemaVersion={0}
      deleteRealmIfMigrationNeeded={true}>
      <GestureHandlerRootView style={{flex: 1}}>
        <RootNavigate />
        {/* <BottomSheetModalProvider>
        </BottomSheetModalProvider> */}
      </GestureHandlerRootView>
    </RealmProvider>
  );
};

export default App;
