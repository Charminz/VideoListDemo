import moment from "moment";
import { range } from "ramda/es";

export const LOAD_CLIPS_REQUEST = 'LOAD_CLIPS_REQUEST';
export const LOAD_CLIPS_SUCCESS = 'LOAD_CLIPS_SUCCESS';
export const LOAD_CLIPS_FAL = 'LOAD_CLIPS_FAL';

const loadDashcamClipsRequest = () => ({ type: LOAD_CLIPS_REQUEST });
const loadDashcamClipsSuccess = (payload ) => ({ type: LOAD_CLIPS_SUCCESS, payload });
const loadDashcamClipsFail = (error) => ({ type: LOAD_CLIPS_FAL, error });

export const loadDashcamClipsByPage = (nextPage = 0, clipsPerPage = 50) => (dispatch) => {
	dispatch(loadDashcamClipsRequest());
	getVideos({ pageNo: nextPage, itemsPerPage: clipsPerPage })
		.then(response => {
			const videos = response.data;
			dispatch(loadDashcamClipsSuccess({
				clips: videos,
				pageNo: nextPage,
				resetList: nextPage === 0
			}))
		}).catch(err => {
			dispatch(loadDashcamClipsFail(err));
		})
};

const getRandomDate = () => {
	const start = moment("2019-06-10").valueOf(); // unix timestamp
	const end = moment().valueOf(); // unix timestamp
	return moment(start + Math.random() * (end - start));
};

// API request
const getVideos = ({ pageNo, itemsPerPage }) => {
	return new Promise((resolve) => {
		setTimeout(() => {
			const data = range(pageNo * itemsPerPage, (pageNo + 1) * itemsPerPage).map(id => ({
				videoId: id + 1,
				fileName: `Dashcam clip no. ${id + 1}`,
				time: getRandomDate()
			}));

			resolve({ data });
		}, 1000);
	})
};
