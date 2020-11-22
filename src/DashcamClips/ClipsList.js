import React, { PureComponent } from 'react';
import { StyleSheet, View, FlatList, Image, ActivityIndicator } from 'react-native';
import { List } from 'react-native-paper';
import { DISPLAY_TIMESTAMP_FORMAT } from "../util/constants";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { loadDashcamClipsByPage } from "./ClipsActions";
import { isEmpty } from "ramda/es";
import moment from "moment";

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

class ClipsList extends PureComponent {
	constructor(props) {
		super(props);

		if (isEmpty(props.clipsList) && !props.isLoading) {
			props.actions.loadDashcamClipsByPage(0, 50, props.clipsFilter.fromDate, props.clipsFilter.toDate);
		}
	}

	openVideoDetails = (videoData) => {
		console.log("Opening video", videoData);
	};

	getNextPage = () => {
		if (!this.props.isLoading) {
			this.props.actions.loadDashcamClipsByPage(
				this.props.clipsPageNo + 1,
				50,
				this.props.clipsFilter.fromDate,
				this.props.clipsFilter.toDate
			);
		}
	};

	renderClipPreviewInfo = ({ item }) => (
		<List.Item
			title={item.fileName}
			description={moment(item.time).format(DISPLAY_TIMESTAMP_FORMAT)}
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
					data={this.props.clipsList}
					keyExtractor={this.getListKey}
					renderItem={this.renderClipPreviewInfo}
					ItemSeparatorComponent={this.renderDivider}
					initialNumToRender={10}
					onEndReachedThreshold={1}
					onEndReached={this.getNextPage}
					ListFooterComponent={this.props.isLoading ? this.renderLoading() : null}
				/>
			</View>
		);
	}
}

const mapStateToProps = (state) => ({
	clipsList: state.clips.list,
	clipsPageNo: state.clips.pageNo,
	isLoading: state.clips.loading,
	clipsFilter: state.clips.filter
});

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators({
		loadDashcamClipsByPage
	}, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ClipsList);
