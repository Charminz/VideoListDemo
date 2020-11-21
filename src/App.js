import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { NativeRouter, Route } from 'react-router-native';
import LandingPage from './LandingPage';
import { SECONDARY_COLOR } from "./util/constants";
import DashcamClips from "./DashcamClips";

const App = () => (
	<NativeRouter>
		<PaperProvider>
			<StatusBar barStyle="light-content" backgroundColor={SECONDARY_COLOR}/>
			<SafeAreaView style={{ width: "100%", height: "100%" }}>
				<Route exact path="/" component={LandingPage}/>
				<Route exact path="/clip-history" component={DashcamClips}/>
			</SafeAreaView>
		</PaperProvider>
	</NativeRouter>
);

export default App;
