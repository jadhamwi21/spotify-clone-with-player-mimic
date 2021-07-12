import { useContext, useEffect, useReducer } from "react";
import { SpotifyMeContext } from "../App";
import { spotify } from "../Spotify/spotify";
import {
	NavAvailableSelections,
	UserReducerActionTypesENUM,
} from "../types/types";

export interface StateInterface {
	SelectedNavOption: NavAvailableSelections;
	Playlists: SpotifyApi.PlaylistObjectSimplified[] | null;
	SelectedPlaylist: SpotifyApi.PlaylistObjectSimplified | null;
	DiscoverWeekly: SpotifyApi.SinglePlaylistResponse | null;
}
interface SelectNavOptionAction {
	type: UserReducerActionTypesENUM.SelectNavOption;
	payload: {
		selectedOption: NavAvailableSelections;
	};
}
interface StorePlaylistsAction {
	type: UserReducerActionTypesENUM.StorePlaylists;
	payload: {
		Playlists: SpotifyApi.PlaylistObjectSimplified[];
	};
}
interface SelectPlaylistsAction {
	type: UserReducerActionTypesENUM.SelectPlaylist;
	payload: {
		selectedPlaylist: SpotifyApi.PlaylistObjectSimplified | null;
	};
}
interface StoreDiscoverWeeklyAction {
	type: UserReducerActionTypesENUM.StoreDiscoverWeekly;
	payload: {
		discoverPlaylist: SpotifyApi.SinglePlaylistResponse;
	};
}
type UserReducerAction =
	| SelectNavOptionAction
	| StorePlaylistsAction
	| SelectPlaylistsAction
	| StoreDiscoverWeeklyAction;
const UserReducer = (
	state: StateInterface,
	action: UserReducerAction
): StateInterface => {
	switch (action.type) {
		case UserReducerActionTypesENUM.SelectNavOption:
			return { ...state, SelectedNavOption: action.payload.selectedOption };
		case UserReducerActionTypesENUM.StorePlaylists:
			return { ...state, Playlists: action.payload.Playlists };
		case UserReducerActionTypesENUM.StoreDiscoverWeekly:
			return { ...state, DiscoverWeekly: action.payload.discoverPlaylist };
		case UserReducerActionTypesENUM.SelectPlaylist:
			return { ...state, SelectedPlaylist: action.payload.selectedPlaylist };
		default:
			return state;
	}
};

export const useUserData = () => {
	const Me = useContext(SpotifyMeContext);
	const [state, dispatch] = useReducer(UserReducer, {
		SelectedNavOption: NavAvailableSelections.home,
		Playlists: null,
		SelectedPlaylist: null,
		DiscoverWeekly: null,
	});
	console.log(state);
	useEffect(() => {
		if (Me !== null) {
			const UserID = Me.id;
			spotify.getUserPlaylists(UserID).then((data) => {
				console.log("playlists", data);
				dispatch({
					type: UserReducerActionTypesENUM.StorePlaylists,
					payload: {
						Playlists: data.items,
					},
				});
			});
			spotify.getPlaylist("37i9dQZEVXcTPNtYblhQF8").then((data) => {
				dispatch({
					type: UserReducerActionTypesENUM.StoreDiscoverWeekly,
					payload: {
						discoverPlaylist: data,
					},
				});
			});
		}
	}, [Me]);
	const Handlers = {
		NavOptionSelector: (option: NavAvailableSelections) => {
			dispatch({
				type: UserReducerActionTypesENUM.SelectPlaylist,
				payload: {
					selectedPlaylist: null,
				},
			});
			dispatch({
				type: UserReducerActionTypesENUM.SelectNavOption,
				payload: {
					selectedOption: option,
				},
			});
		},
		PlaylistSelector: (playlist: SpotifyApi.PlaylistObjectSimplified) => {
			dispatch({
				type: UserReducerActionTypesENUM.SelectNavOption,
				payload: {
					selectedOption: NavAvailableSelections.none,
				},
			});
			dispatch({
				type: UserReducerActionTypesENUM.SelectPlaylist,
				payload: {
					selectedPlaylist: playlist,
				},
			});
		},
	};
	return {
		Data: state,
		Handlers: Handlers,
	};
};
