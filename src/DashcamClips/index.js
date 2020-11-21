import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Appbar } from "react-native-paper";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { PRIMARY_COLOR, SECONDARY_COLOR } from "../util/constants";

const styles = StyleSheet.create({
	appbar: {
		backgroundColor: PRIMARY_COLOR,
		paddingHorizontal: 0
	},
	appbarBtn: {
		height: "100%",
		width: 40,
		alignItems: "center",
		justifyContent: "center",
		paddingLeft: 5
	}
});

const DashcamClips = ({ history }) => (
	<View>
		<Appbar.Header style={styles.appbar}>
			<TouchableOpacity
				style={styles.appbarBtn}
				onPress={history.goBack}
			>
				<Icon
					name="arrow-back-ios"
					size={20}
					color={SECONDARY_COLOR}
				/>
			</TouchableOpacity>
			<Appbar.Content
				title="Dashcam Clips"
			/>
		</Appbar.Header>
	</View>
);

export default DashcamClips;
