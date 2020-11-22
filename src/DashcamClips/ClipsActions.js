import moment from "moment";
import { range, sort, prop, descend } from "ramda/es";

export const LOAD_CLIPS_REQUEST = 'LOAD_CLIPS_REQUEST';
export const LOAD_CLIPS_SUCCESS = 'LOAD_CLIPS_SUCCESS';
export const LOAD_CLIPS_FAL = 'LOAD_CLIPS_FAL';

const loadDashcamClipsRequest = (hardReset) => ({ type: LOAD_CLIPS_REQUEST, hardReset });
const loadDashcamClipsSuccess = (payload ) => ({ type: LOAD_CLIPS_SUCCESS, payload });
const loadDashcamClipsFail = (error) => ({ type: LOAD_CLIPS_FAL, error });

export const loadDashcamClipsByPage = (nextPage = 0, clipsPerPage = 50, fromDate = null, toDate = null, hardReset = false) => (dispatch) => {
	dispatch(loadDashcamClipsRequest(hardReset));
	getVideos({ pageNo: nextPage, itemsPerPage: clipsPerPage, fromDate, toDate })
		.then(response => {
			const videos = response.data;
			dispatch(loadDashcamClipsSuccess({
				clips: videos,
				pageNo: nextPage,
				resetList: nextPage === 0,
				filter: {
					fromDate,
					toDate
				}
			}))
		}).catch(err => {
			dispatch(loadDashcamClipsFail(err));
		})
};

const getRandomDate = (fromDate, toDate) => {
	const start = fromDate || moment("2019-06-10").valueOf(); // unix timestamp
	const end = toDate || moment().valueOf(); // unix timestamp
	return moment(start + Math.random() * (end - start)).valueOf();
};

// API request
const getVideos = ({ pageNo, itemsPerPage, fromDate, toDate }) => {
	return new Promise((resolve) => {
		setTimeout(() => {
			const data = range(pageNo * itemsPerPage, (pageNo + 1) * itemsPerPage).map(id => {
				const clipTime = getRandomDate(fromDate, toDate);
				return {
					videoId: id + 1,
					fileName: `${moment(clipTime).format("YYYY-MM-DDTHH:mm:ss.SSS")}.mp4`,
					time: clipTime
				}
			});

			// Sort the returned data by recording time
			// Assuming that API returns the sorted paged data - meaning that the whole data is consistently sorted
			// At the moment this fake FE sorting will fail (list wont be sorted properly) when new page is loaded
			resolve({ data: sort(descend(prop("time")), data) });
		}, 500);
	})
};
