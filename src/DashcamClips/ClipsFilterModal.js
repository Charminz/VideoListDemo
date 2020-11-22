import React, { Component } from 'react';
import { Modal, View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Button, IconButton } from "react-native-paper";
import moment from 'moment';
import { isNil } from "ramda/es";
import DateTimePicker from '@react-native-community/datetimepicker';
import { PRIMARY_COLOR } from "../util/constants";
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import { loadDashcamClipsByPage } from "./ClipsActions";

const styles = StyleSheet.create({
	backdrop: {
		height: "100%",
		width: "100%",
		position: "absolute",
		opacity: 0.7,
		backgroundColor: "black"
	},
	container: {
		width: "100%",
		height: "100%",
		justifyContent: "center",
		alignItems: "center"
	},
	content: {
		backgroundColor: "white",
		width: "90%",
		borderRadius: 5,
		padding: 5
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginHorizontal: 5,
		marginBottom: 10,
		paddingLeft: 5,
		borderBottomWidth: 0.5,
		borderBottomColor: "black",
		alignItems: "center"
	},
	headerText: {
		fontSize: 20,
		fontWeight: "600"
	},
	filtersContainer: {
		marginHorizontal: 20
	},
	input: {
		borderColor: "gray",
		borderWidth: 0.5,
		borderRadius: 2,
		height: 40,
		flex: 1,
		marginVertical: 5,
		justifyContent: "center",
		paddingLeft: 20
	},
	filterRow: {
		width: "100%",
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 10
	},
	inputLabel: {
		flex: 0.2
	},
	footer: {
		flexDirection: "row",
		justifyContent: "flex-end",
		marginTop: 10
	}
});

class ClipsFilterModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			fromDate: props.filter.fromDate,
			toDate: props.filter.toDate,
			datepickerOpen: false,
			activeDateField: ""
		}
	}

	confirmFilter = () => {
		this.props.actions.loadDashcamClipsByPage(0, 50, this.state.fromDate, this.state.toDate, true);
		this.props.onClose();
	};

	openDatePicker = (prop) => {
		this.setState({
			datepickerOpen: true,
			activeDateField: prop
		})
	};

	handleDateSelect = (event) => {
		this.setState(prevState => ({
			datepickerOpen: false,
			activeDateField: "",
			[prevState.activeDateField]: event.nativeEvent.timestamp
		}))
	};

	renderHeaderRow = () => (
		<View style={styles.header}>
			<Text style={styles.headerText}>Filter your clips</Text>
			<IconButton
				icon="close"
				size={24}
				onPress={this.props.onClose}
			/>
		</View>
	);

	renderDatePickerInput = (value, onPress = () => null) => (
		<TouchableOpacity
			activeOpacity={1}
			style={styles.input}
			onPress={onPress}
		>
			<Text>
				{!isNil(value) && moment(value).format("DD.MM.YYYY")}
			</Text>
		</TouchableOpacity>
	);

	renderFilters = () => (
		<View style={styles.filtersContainer}>
			<Text>By recording date</Text>
			<View style={styles.filterRow}>
				<Text style={styles.inputLabel}>From</Text>
				{ this.renderDatePickerInput(this.state.fromDate, () => this.openDatePicker("fromDate")) }
			</View>
			<View style={styles.filterRow}>
				<Text style={styles.inputLabel}>To</Text>
				{ this.renderDatePickerInput(this.state.toDate, () => this.openDatePicker("toDate")) }
			</View>
		</View>
	);

	renderFooter = () => (
		<View style={styles.footer}>
			<Button
				onPress={this.confirmFilter}
				mode="contained"
				color={PRIMARY_COLOR}
			>
				Filter
			</Button>
		</View>
	);

	renderDatepicker = () => {
		const value = this.state[this.state.activeDateField];
		return (
			<DateTimePicker
				value={value ? new Date(value) : new Date()}
				mode="date"
				onChange={this.handleDateSelect}
			/>
		)
	};

	render() {
		return (
			<Modal
				animationType="slide"
				transparent
				visible={this.props.open}
				onRequestClose={this.props.onClose}
			>
				<View style={styles.backdrop}/>
				<View style={styles.container}>
					<View style={styles.content}>
						{ this.renderHeaderRow() }
						{ this.renderFilters() }
						{ this.renderFooter()}
					</View>
				</View>
				{this.state.datepickerOpen && this.renderDatepicker()}
			</Modal>
		);
	}
}

const mapStateToProps = state => ({
	filter: state.clips.filter
});

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators({
		loadDashcamClipsByPage
	}, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ClipsFilterModal);
