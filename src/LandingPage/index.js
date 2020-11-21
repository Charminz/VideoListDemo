import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Snackbar, Text } from 'react-native-paper';
import { PRIMARY_COLOR, SECONDARY_COLOR } from "../util/constants";

const styles = StyleSheet.create({
	root: {
		width: "100%",
		flex: 1,
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: SECONDARY_COLOR
	},
	btn: {
		marginVertical: 50,
		width: "75%",
		maxWidth: 350,
		minWidth: 200,
		borderRadius: 10
	},
	btnContent: { height: 80 },
	btnLabel: {
		fontSize: 22
	}
});

const LandingPage = ({ history }) => {
	const [alertMessage, setAlert] = React.useState(null);
	const showAlertMessage = (message: string) => setAlert(message);
	const onDismissAlert = () => setAlert(null);

	const navigateTo = (path: string) => history.push(path);

	return (
		<>
			<View style={styles.root}>
				<Button
					icon="camera"
					mode="contained"
					onPress={() => showAlertMessage("Unfortunately you have to wait until our coffee maniacs finish this functionality")}
					style={styles.btn}
					contentStyle={styles.btnContent}
					labelStyle={styles.btnLabel}
					uppercase={false}
					color={PRIMARY_COLOR}
				>
					Start Recording
				</Button>
				<Button
					icon="image-multiple"
					mode="contained"
					onPress={() => navigateTo("/clip-history")}
					style={styles.btn}
					contentStyle={styles.btnContent}
					labelStyle={styles.btnLabel}
					uppercase={false}
					color={PRIMARY_COLOR}
				>
					View Clips
				</Button>
			</View>
			<Snackbar
				visible={Boolean(alertMessage)}
				onDismiss={onDismissAlert}
				action={{
					label: 'Dismiss',
					onPress: onDismissAlert
				}}
				duration={3000}
				style={{ backgroundColor: PRIMARY_COLOR }}
				theme={{ colors: { accent: SECONDARY_COLOR } }}
			>
				<Text>{alertMessage}</Text>
			</Snackbar>
		</>
	);
};

export default LandingPage;
