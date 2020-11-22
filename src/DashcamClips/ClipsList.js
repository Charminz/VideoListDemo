import React, { Component } from 'react';
import { StyleSheet, View, FlatList, Image, ActivityIndicator } from 'react-native';
import { List } from 'react-native-paper';
import { range } from 'ramda/es';
import moment from 'moment';
import { DISPLAY_TIMESTAMP_FORMAT } from "../util/constants";

const styles = StyleSheet.create({
	root: {
		flex: 1,
		flexDirection: "column"
	},
	previewImg: {
		width: 150,
		height: 100,
		marginRight: 10,
		borderRadius: 5
	},
	spinnerContainer: {
		marginVertical: 15
	},
	divider: {
		alignSelf: "center",
		height: 1,
		width: "98%",
		backgroundColor: "#e0e0e0"
	}
});

class ClipsList extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoading: false // TODO: take from redux
		};
	}

	getRandomDate = () => {
		const start = moment("2019-06-10").valueOf(); // unix timestamp
		const end = moment().valueOf(); // unix timestamp
		return moment(start + Math.random() * (end - start));
	};

	mapDashcamVideos = () => {
		return range(1, 1500).map(index => ({
			videoId: index,
			fileName: `Dashcam clip no. ${index}`,
			time: this.getRandomDate()
		}));
	};

	openVideoDetails = (videoData) => {
		console.log("Opening video", videoData);
	};

	getNextPage = () => {
		console.log('end reaching');
	};

	renderClipPreviewInfo = ({ item }) => (
		<List.Item
			title={item.fileName}
			description={item.time.format(DISPLAY_TIMESTAMP_FORMAT)}
			onPress={() => this.openVideoDetails(item)}
			left={() => (
				<Image
					style={styles.previewImg}
					source={require('./mockDashcamImg.png')}
				/>
			)}
		/>
	);

	renderDivider = () => <View style={styles.divider} />;

	renderLoading = () => (
		<View style={styles.spinnerContainer}>
			<ActivityIndicator size={45} color="#03a9f4" />
		</View>
	);

	getListKey = (item) => item.videoId.toString();

	render() {
		return (
			<View style={styles.root}>
				<FlatList
					data={this.mapDashcamVideos()}
					keyExtractor={this.getListKey}
					renderItem={this.renderClipPreviewInfo}
					ItemSeparatorComponent={this.renderDivider}
					initialNumToRender={10}
					onEndReachedThreshold={5}
					onEndReached={this.getNextPage}
					ListFooterComponent={this.state.isLoading ? this.renderLoading() : null}
				/>
			</View>
		);
	}
}

export default ClipsList;
