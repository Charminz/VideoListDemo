import { combineReducers } from "redux/es/redux";
import clipsReducer from "../DashcamClips/ClipsReducer";

export default combineReducers({
	clips: clipsReducer
})
