import { useState, useEffect } from "react";
import { StateInterface } from "./useUserData";
import { getPlaylist } from "../Spotify/spotify";
interface parametersInterface {
	Data: StateInterface;
}
const useSelectPlaylist = ({ Data }: parametersInterface) => {
	const [playlist, setPlaylist] =
		useState<SpotifyApi.SinglePlaylistResponse | null>(null);
	useEffect(() => {
		if (Data.SelectedPlaylist !== null) {
			const AsyncPlaylistSetter = async () => {
				console.log(Data.SelectedPlaylist?.id);
				const playlistResponse = await getPlaylist(Data.SelectedPlaylist?.id!);
				setPlaylist(playlistResponse);
			};
			AsyncPlaylistSetter();
		}
	}, [Data.SelectedPlaylist]);
	return playlist;
};

export default useSelectPlaylist;
