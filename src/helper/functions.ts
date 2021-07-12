import { getAlbumNameAndCoverOfThisTrack } from "../Spotify/spotify";
export const Delay = async (seconds: number): Promise<undefined> => {
	return await new Promise((resolve) => setTimeout(resolve, seconds * 1000));
};
export const asyncForEach = async (
	Arry: Array<any>,
	cb: (element?: typeof Arry[0], index?: number) => Promise<void>
) => {
	for (let i = 0; i < Arry.length; i++) {
		await cb(Arry[i], i);
	}
};
export interface ModifiedSingleTrackObject
	extends SpotifyApi.PlaylistTrackObject {
	albumname?: string;
	albumcover?: string;
}
export const ExtractDataFromPlaylistSingleResponse = async (
	Response: SpotifyApi.SinglePlaylistResponse | null
) => {
	if (Response!) {
		const { description, followers, name, images, tracks } = Response;
		await asyncForEach(
			tracks.items,
			async (item: ModifiedSingleTrackObject) => {
				[item.albumname, item.albumcover] =
					await getAlbumNameAndCoverOfThisTrack(item.track.id);
			}
		);
		const returned = { description, followers, name, images, tracks };
		return returned;
	} else {
		return null;
	}
};
export const FormWithPluralOrSingular = (
	Quantity: number | undefined,
	Word: string
) => {
	if (Quantity === undefined) return "";
	if (Quantity === 1) {
		return Quantity + " " + Word;
	} else {
		return Quantity + " " + Word + "s";
	}
};
export const CalculateTrackAdditionDate = (date: string) => {
	const presentDate = new Date();
	const trackDate = new Date(date);
	if (presentDate.getUTCFullYear() - trackDate.getUTCFullYear() >= 1) {
		return FormWithPluralOrSingular(
			presentDate.getUTCFullYear() - trackDate.getUTCFullYear(),
			"year"
		);
	} else if (presentDate.getUTCMonth() - trackDate.getUTCMonth() >= 1) {
		return FormWithPluralOrSingular(
			presentDate.getUTCMonth() - trackDate.getUTCMonth(),
			"month"
		);
	} else if (presentDate.getUTCDay() - trackDate.getUTCDay() >= 1) {
		return FormWithPluralOrSingular(
			presentDate.getUTCDay() - trackDate.getUTCDay(),
			"day"
		);
	} else if (presentDate.getUTCHours() - trackDate.getUTCHours() >= 1) {
		return FormWithPluralOrSingular(
			presentDate.getUTCHours() - trackDate.getUTCHours(),
			"hour"
		);
	} else if (presentDate.getUTCMinutes() - trackDate.getUTCMinutes() >= 1) {
		return FormWithPluralOrSingular(
			presentDate.getUTCMinutes() - trackDate.getUTCMinutes(),
			"minute"
		);
	} else {
		return FormWithPluralOrSingular(
			presentDate.getUTCSeconds() - trackDate.getUTCSeconds(),
			"second"
		);
	}
};
export const ExtractPlayedSongMetaData = (
	data: SpotifyApi.CurrentlyPlayingResponse
) => {
	const AlbumCover = data.item?.album.images[0].url;
	const ArtistName = data.item?.artists[0].name;
	const SongName = data.item?.name;
	const Duration = data.item?.duration_ms;
	return { AlbumCover, ArtistName, SongName, Duration };
};
export const ExtractControllerData = (
	data: SpotifyApi.CurrentPlaybackResponse
) => {
	const Repeat = data.repeat_state;
	const Shuffle = data.shuffle_state;
	const PlayStatus = data.is_playing;
	const Volume = data.device.volume_percent;
	const Progress = data.progress_ms;
	return { Repeat, Shuffle, PlayStatus, Volume, Progress };
};
export const milliSecondsTo_Hours_Minutes_Seconds = (ms: number) => {
	let seconds: string | number = Math.floor((ms / 1000) % 60);
	let minutes: string | number = Math.floor((ms / (1000 * 60)) % 60);
	let hours: string | number = Math.floor((ms / (1000 * 60 * 60)) % 24);
	minutes = minutes < 10 ? "0" + minutes : minutes;
	seconds = seconds < 10 ? "0" + seconds : seconds;
	if (hours === 0) return +minutes + ":" + seconds;
	hours = hours < 10 ? "0" + hours : hours;
	return hours + ":" + minutes + ":" + seconds;
};
export const ProgressBarWidthCalculator = (
	Progress: number,
	Duration: number
) => {
	const WidthValueAsPercent = (Progress / Duration) * 100;
	return WidthValueAsPercent;
};
