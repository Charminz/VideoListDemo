import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { NativeRouter, Route } from 'react-router-native';
import LandingPage from './LandingPage';
import { SECONDARY_COLOR } from "./util/constants";
import DashcamClips from "./DashcamClips";
import { Provider as ReduxProvider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './store/RootReducer';
import { applyMiddleware } from "redux/es/redux";
import thunk from "redux-thunk";


const store = createStore(rootReducer, applyMiddleware(thunk));

const App = () => (
	<ReduxProvider store={store}>
		<NativeRouter>
			<PaperProvider>
				<StatusBar barStyle="light-content" backgroundColor={SECONDARY_COLOR}/>
				<SafeAreaView style={{ width: "100%", height: "100%" }}>
					<Route exact path="/" component={LandingPage}/>
					<Route exact path="/clip-history" component={DashcamClips}/>
				</SafeAreaView>
			</PaperProvider>
		</NativeRouter>
	</ReduxProvider>
);

export default App;
