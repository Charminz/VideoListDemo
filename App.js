import React from 'react';
import { SafeAreaView, Text, StatusBar } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';

const App = () => (
  <PaperProvider>
    <StatusBar barStyle="dark-content" />
    <SafeAreaView>
      <Text>To be continued...</Text>
    </SafeAreaView>
  </PaperProvider>
);

export default App;
