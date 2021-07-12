export enum UserReducerActionTypesENUM {
	SelectNavOption,
	StorePlaylists,
	SelectPlaylist,
	StoreDiscoverWeekly,
}
export enum RepeatStateENUM {
	Off = "off",
	Context = "content",
	Track = "track",
}
export enum NavAvailableSelections {
	none,
	home,
	search,
}
export enum SearchActionTypesENUM {
	InitializeLoading,
	StartLoading,
	StopLoading,
	SetArtists,
	SetAlbums,
	SetSongs,
	UpdateInputField,
}
export enum PlayerActionTypesENUM {
	StoreAlbumCover,
	StoreSongName,
	StoreArtistName,
	StartLoadingData,
	StopLoadingData,
	UpdateShuffle,
	UpdateRepeat,
	UpdatePlayStatus,
	SaveVolume,
	SetSongDuration,
	SetSongProgress,
	SetDeviceAndPlaybackExistance,
	SetLyrics,
}

export type MeType = SpotifyApi.CurrentUsersProfileResponse | null;
export type PlaylistDataType = {
	description: string | null;
	followers: SpotifyApi.FollowersObject;
	name: string;
	images: SpotifyApi.ImageObject[];
	tracks: SpotifyApi.PagingObject<SpotifyApi.PlaylistTrackObject>;
} | null;
