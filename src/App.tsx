import React from "react";
import Loader from "./Components/Loader/Loader";
import Login from "./Components/Login/Login";
import SpotifyInterface from "./Components/SpotifyInterface/SpotifyInterface";
import { useAccessToken } from "./hooks/useAccessToken";
import { spotify } from "./Spotify/spotify";
import { MeType } from "./types/types";
export const SpotifyMeContext = React.createContext({} as MeType);
const App: React.FC<{}> = () => {
	const [token, isLoadingToken, me]: [string, boolean, MeType] =
		useAccessToken();
	console.log(isLoadingToken);
	return (
		<SpotifyMeContext.Provider value={me}>
			{token === "" ? (
				isLoadingToken ? (
					<Loader />
				) : (
					<Login />
				)
			) : isLoadingToken ? (
				<Loader />
			) : (
				<SpotifyInterface token={token} />
			)}
		</SpotifyMeContext.Provider>
	);
};

export default App;
