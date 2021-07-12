import {
	clientID,
	redirectURI,
	spotifyAuthEndpoint,
	spotifyScopes,
} from "./constants";
import SpotifyWebApi from "spotify-web-api-js";
export const spotify = new SpotifyWebApi();
export const Form_Spotify_Auth_URI = (): string => {
	const formedAuthURI = `${spotifyAuthEndpoint}?client_id=${clientID}&response_type=token&redirect_uri=${redirectURI}&scope=${spotifyScopes.join(
		"%20"
	)}&show_dialog=true`;
	return formedAuthURI;
};
export type HashReturnedValuesType = {
	[key: string]: string;
};
export const extractAccessToken = (hash: string): HashReturnedValuesType => {
	const modifiedHashString: string = hash.substring(1);
	let HashReturnedValues: HashReturnedValuesType = {};
	modifiedHashString.split("&").forEach((returnedHashKeyValue) => {
		const [key, value] = returnedHashKeyValue.split("=");
		HashReturnedValues[key] = value;
	});
	return HashReturnedValues;
};
export const getUserPlaylist = async (
	userId: string
): Promise<SpotifyApi.PlaylistObjectSimplified[]> => {
	const { items } = await spotify.getUserPlaylists(userId);
	return items;
};
export const getPlaylist = async (playlistId: string) => {
	const playlistResponse = await spotify.getPlaylist(playlistId);
	return playlistResponse;
};
export const getAlbumNameAndCoverOfThisTrack = async (
	trackId: string
): Promise<[string, string]> => {
	const Track = await spotify.getTrack(trackId);
	return [Track.album.name, Track.album.images[0].url];
};
export const SendQueryAndReceiveSongsArtistsAlbums = async (
	query: string
): Promise<{
	Songs: SpotifyApi.TrackObjectFull[] | [];
	Albums: SpotifyApi.AlbumObjectSimplified[] | [];
	Artists: SpotifyApi.ArtistObjectFull[] | [];
}> => {
	console.log("REQ");
	return await spotify
		.search(query, ["album", "artist", "track"])
		.then((data) => {
			const Songs = data.tracks?.items ? data.tracks.items : [];
			const Albums = data.albums?.items ? data.albums.items : [];
			const Artists = data.artists?.items ? data.artists.items : [];
			return {
				Songs,
				Albums,
				Artists,
			};
		});
};
