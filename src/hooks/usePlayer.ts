import { useEffect, useReducer } from "react";
import { spotify } from "../Spotify/spotify";
import { PlayerActionTypesENUM, RepeatStateENUM } from "../types/types";
import {
	ExtractPlayedSongMetaData,
	ExtractControllerData,
} from "../helper/functions";
interface PlayerStateInterface {
	AlbumCover: string;
	SongName: string;
	ArtistName: string;
	Shuffle: boolean;
	Repeat: string;
	PlayStatus: boolean;
	Volume: number;
	IsLoadingPlaybackData: boolean;
	DeviceAndPlaybackExistance: boolean;
	SongDuration: number;
	SongProgress: number;
}
interface StartLoadingDataAction {
	type: PlayerActionTypesENUM.StartLoadingData;
}
interface StopLoadingDataAction {
	type: PlayerActionTypesENUM.StopLoadingData;
}
interface StoreAlbumCoverAction {
	type: PlayerActionTypesENUM.StoreAlbumCover;
	payload: {
		AlbumCover: string;
	};
}
interface SetSongDurationAction {
	type: PlayerActionTypesENUM.SetSongDuration;
	payload: {
		SongDuration: number;
	};
}
interface SetSongProgressAction {
	type: PlayerActionTypesENUM.SetSongProgress;
	payload: {
		SongProgress: number;
	};
}
interface SaveVolumeAction {
	type: PlayerActionTypesENUM.SaveVolume;
	payload: {
		VolumeValue: number;
	};
}
interface SetDeviceExistanceAction {
	type: PlayerActionTypesENUM.SetDeviceAndPlaybackExistance;
	payload: {
		DeviceExistance: boolean;
	};
}
interface StoreSongNameAction {
	type: PlayerActionTypesENUM.StoreSongName;
	payload: {
		SongName: string;
	};
}
interface StoreArtistNameAction {
	type: PlayerActionTypesENUM.StoreArtistName;
	payload: {
		ArtistName: string;
	};
}
interface UpdateShuffleAction {
	type: PlayerActionTypesENUM.UpdateShuffle;
	payload: {
		Shuffle: boolean;
	};
}
interface UpdateRepeatAction {
	type: PlayerActionTypesENUM.UpdateRepeat;
	payload: {
		Repeat: string;
	};
}
interface UpdatePlayStatusAction {
	type: PlayerActionTypesENUM.UpdatePlayStatus;
	payload: {
		PlayStatus: boolean;
	};
}
type PlayerActions =
	| SetSongProgressAction
	| SetSongDurationAction
	| SetDeviceExistanceAction
	| SaveVolumeAction
	| UpdatePlayStatusAction
	| UpdateRepeatAction
	| UpdateShuffleAction
	| StoreAlbumCoverAction
	| StoreSongNameAction
	| StoreArtistNameAction
	| StartLoadingDataAction
	| StopLoadingDataAction;
const PlayerReducer = (
	state: PlayerStateInterface,
	action: PlayerActions
): PlayerStateInterface => {
	switch (action.type) {
		case PlayerActionTypesENUM.SetSongDuration:
			return { ...state, SongDuration: action.payload.SongDuration };
		case PlayerActionTypesENUM.SetSongProgress:
			return { ...state, SongProgress: action.payload.SongProgress };
		case PlayerActionTypesENUM.SetDeviceAndPlaybackExistance:
			return {
				...state,
				DeviceAndPlaybackExistance: action.payload.DeviceExistance,
			};
		case PlayerActionTypesENUM.StartLoadingData:
			return { ...state, IsLoadingPlaybackData: true };
		case PlayerActionTypesENUM.StopLoadingData:
			return { ...state, IsLoadingPlaybackData: false };
		case PlayerActionTypesENUM.StoreAlbumCover:
			return { ...state, AlbumCover: action.payload.AlbumCover };
		case PlayerActionTypesENUM.StoreArtistName:
			return { ...state, ArtistName: action.payload.ArtistName };
		case PlayerActionTypesENUM.StoreSongName:
			return { ...state, SongName: action.payload.SongName };
		case PlayerActionTypesENUM.UpdateRepeat:
			return { ...state, Repeat: action.payload.Repeat };
		case PlayerActionTypesENUM.UpdateShuffle:
			return { ...state, Shuffle: action.payload.Shuffle };
		case PlayerActionTypesENUM.UpdatePlayStatus:
			return { ...state, PlayStatus: action.payload.PlayStatus };
		case PlayerActionTypesENUM.SaveVolume:
			return { ...state, Volume: action.payload.VolumeValue };
		default:
			return state;
	}
};
const usePlayer = () => {
	const [
		{
			AlbumCover,
			ArtistName,
			SongName,
			IsLoadingPlaybackData,
			Shuffle,
			Repeat,
			PlayStatus,
			Volume,
			DeviceAndPlaybackExistance,
			SongDuration,
			SongProgress,
		},
		dispatch,
	] = useReducer(PlayerReducer, {
		AlbumCover: "",
		ArtistName: "",
		Volume: 0,
		SongName: "",
		IsLoadingPlaybackData: true,
		Shuffle: false,
		Repeat: RepeatStateENUM.Off,
		PlayStatus: false,
		DeviceAndPlaybackExistance: false,
		SongDuration: 0,
		SongProgress: 0,
	});
	useEffect(() => {
		setInterval(async () => {
			const PlayedTrackData = await spotify.getMyCurrentPlayingTrack();
			const ControllerData = await spotify.getMyCurrentPlaybackState();
			if (PlayedTrackData && ControllerData) {
				dispatch({
					type: PlayerActionTypesENUM.SetDeviceAndPlaybackExistance,
					payload: {
						DeviceExistance: true,
					},
				});
				const { ArtistName, AlbumCover, SongName, Duration } =
					ExtractPlayedSongMetaData(PlayedTrackData);
				if (AlbumCover)
					dispatch({
						type: PlayerActionTypesENUM.StoreAlbumCover,
						payload: { AlbumCover: AlbumCover },
					});
				if (ArtistName)
					dispatch({
						type: PlayerActionTypesENUM.StoreArtistName,
						payload: { ArtistName: ArtistName },
					});
				if (SongName)
					dispatch({
						type: PlayerActionTypesENUM.StoreSongName,
						payload: {
							SongName: SongName,
						},
					});
				if (Duration)
					dispatch({
						type: PlayerActionTypesENUM.SetSongDuration,
						payload: { SongDuration: Duration },
					});
				// Controller State Setter

				const { Repeat, Shuffle, PlayStatus, Volume, Progress } =
					ExtractControllerData(ControllerData);
				if (Progress)
					dispatch({
						type: PlayerActionTypesENUM.SetSongProgress,
						payload: {
							SongProgress: Progress,
						},
					});
				if (Volume)
					dispatch({
						type: PlayerActionTypesENUM.SaveVolume,
						payload: {
							VolumeValue: Volume,
						},
					});
				if (PlayStatus)
					dispatch({
						type: PlayerActionTypesENUM.UpdatePlayStatus,
						payload: {
							PlayStatus,
						},
					});
				if (Repeat)
					dispatch({
						type: PlayerActionTypesENUM.UpdateRepeat,
						payload: {
							Repeat,
						},
					});
				if (Shuffle)
					dispatch({
						type: PlayerActionTypesENUM.UpdateShuffle,
						payload: {
							Shuffle,
						},
					});
			}
			dispatch({ type: PlayerActionTypesENUM.StopLoadingData });
		}, 500);
	}, []);
	return {
		AlbumCover,
		ArtistName,
		SongName,
		IsLoadingPlaybackData,
		Shuffle,
		Repeat,
		PlayStatus,
		Volume,
		DeviceAndPlaybackExistance,
		SongDuration,
		SongProgress,
	};
};

export default usePlayer;
