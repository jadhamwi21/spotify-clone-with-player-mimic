import React, { useReducer, useEffect, useState } from "react";
import { SearchActionTypesENUM } from "../types/types";
import { SendQueryAndReceiveSongsArtistsAlbums } from "../Spotify/spotify";
export interface SearchState {
	Loading: boolean | "initial";
	FieldValue: string;
	Songs: SpotifyApi.TrackObjectFull[] | [];
	Albums: SpotifyApi.AlbumObjectSimplified[] | [];
	Artists: SpotifyApi.ArtistObjectFull[] | [];
}
interface InitializeLoadingAction {
	type: SearchActionTypesENUM.InitializeLoading;
}
interface StartLoadingAction {
	type: SearchActionTypesENUM.StartLoading;
}
interface StopLoadingAction {
	type: SearchActionTypesENUM.StopLoading;
}
interface UpdateFieldAction {
	type: SearchActionTypesENUM.UpdateInputField;
	payload: {
		FieldValue: string;
	};
}
interface SetSongsAction {
	type: SearchActionTypesENUM.SetSongs;
	payload: {
		Songs: SpotifyApi.TrackObjectFull[] | [];
	};
}
interface SetAlbumsAction {
	type: SearchActionTypesENUM.SetAlbums;
	payload: {
		Albums: SpotifyApi.AlbumObjectSimplified[] | [];
	};
}
interface SetArtistsAction {
	type: SearchActionTypesENUM.SetArtists;
	payload: {
		Artists: SpotifyApi.ArtistObjectFull[] | [];
	};
}
type SearchActions =
	| InitializeLoadingAction
	| SetArtistsAction
	| SetAlbumsAction
	| StartLoadingAction
	| StopLoadingAction
	| UpdateFieldAction
	| SetSongsAction;
const SearchReducer = (
	state: SearchState,
	action: SearchActions
): SearchState => {
	switch (action.type) {
		case SearchActionTypesENUM.StartLoading:
			return { ...state, Loading: true };
		case SearchActionTypesENUM.StopLoading:
			return { ...state, Loading: false };
		case SearchActionTypesENUM.UpdateInputField:
			return { ...state, FieldValue: action.payload.FieldValue };
		case SearchActionTypesENUM.SetSongs:
			return { ...state, Songs: action.payload.Songs };
		case SearchActionTypesENUM.SetAlbums:
			return { ...state, Albums: action.payload.Albums };
		case SearchActionTypesENUM.SetArtists:
			return { ...state, Artists: action.payload.Artists };
		case SearchActionTypesENUM.InitializeLoading:
			return { ...state, Loading: "initial" };
		default:
			return state;
	}
};

const useSearch = () => {
	const [{ Loading, FieldValue, Songs, Albums, Artists }, dispatch] =
		useReducer(SearchReducer, {
			Loading: "initial",
			FieldValue: "",
			Songs: [],
			Albums: [],
			Artists: [],
		});
	const [isTyping, setIsTyping] = useState<boolean | "initial">("initial");
	useEffect(() => {
		if (FieldValue === "") {
			dispatch({ type: SearchActionTypesENUM.InitializeLoading });
			return;
		}
		setIsTyping(true);
		const clearTypingTimeoutID = setTimeout(() => setIsTyping(false), 500);
		return () => {
			clearTimeout(clearTypingTimeoutID);
		};
	}, [FieldValue]);
	useEffect(() => {
		if (isTyping === false) {
			dispatch({ type: SearchActionTypesENUM.StartLoading });
			const asyncItemsSetter = async () => {
				const { Songs, Albums, Artists } =
					await SendQueryAndReceiveSongsArtistsAlbums(FieldValue);
				dispatch({
					type: SearchActionTypesENUM.SetSongs,
					payload: {
						Songs: Songs,
					},
				});
				dispatch({
					type: SearchActionTypesENUM.SetAlbums,
					payload: {
						Albums: Albums,
					},
				});
				dispatch({
					type: SearchActionTypesENUM.SetArtists,
					payload: {
						Artists: Artists,
					},
				});
				dispatch({ type: SearchActionTypesENUM.StopLoading });
			};
			asyncItemsSetter();
		}
	}, [isTyping]);
	// useEffect(() => {
	// 	console.log("Songs : ", Songs);
	// 	console.log("Artists : ", Artists);
	// 	console.log("Albums : ", Albums);
	// }, [Songs, Artists, Albums]);
	const Handlers = {
		InputFieldHandler: (
			parameter: React.ChangeEvent<HTMLInputElement> | string
		) => {
			if (typeof parameter === "string") {
				dispatch({
					type: SearchActionTypesENUM.UpdateInputField,
					payload: { FieldValue: parameter },
				});
			} else {
				dispatch({
					type: SearchActionTypesENUM.UpdateInputField,
					payload: {
						FieldValue: parameter.target.value,
					},
				});
			}
		},
	};
	return {
		State: { Loading, FieldValue, Songs, Albums, Artists },
		Handlers,
	};
};

export default useSearch;
