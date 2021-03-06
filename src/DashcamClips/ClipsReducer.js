import { mergeRight, concat } from "ramda/es";
import { LOAD_CLIPS_FAL, LOAD_CLIPS_REQUEST, LOAD_CLIPS_SUCCESS } from "./ClipsActions";

const initialState = {
	loading: false,
	list: [],
	pageNo: 0,
	filter: {
		fromDate: null,
		toDate: null
	}
};

const clipsReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOAD_CLIPS_REQUEST:
			return mergeRight(state, {
				loading: true,
				list: action.hardReset ? [] : state.list
			});
		case LOAD_CLIPS_SUCCESS:
			return mergeRight(state, {
				loading: false,
				list: action.payload.resetList ? action.payload.clips : concat(state.list, action.payload.clips),
				pageNo: action.payload.pageNo,
				filter: action.payload.filter
			});
		case LOAD_CLIPS_FAL:
			return mergeRight(state, {
				loading: false,
				error: action.error
			});
		default:
			return state;
	}
};

export default clipsReducer;
