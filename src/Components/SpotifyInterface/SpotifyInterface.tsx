import React from "react";
import styled from "styled-components";
import { useHideScrollBar } from "../../hooks/useHideScrollBar";
import { StateInterface, useUserData } from "../../hooks/useUserData";
import { spotify } from "../../Spotify/spotify";
import LeftPane from "./LeftPane/LeftPane";
import Player from "./Player/Player";
import RightPane from "./RightPane/RightPane";
export const UserDataContext = React.createContext(
	{} as {
		Data: StateInterface;
		Handlers: { [Handler: string]: any };
	}
);
const SpotifyInterface: React.FC<{ token: string }> = ({ token }) => {
	useHideScrollBar();
	const { Data, Handlers } = useUserData();
	return (
		<UserDataContext.Provider value={{ Data, Handlers }}>
			<InterfaceLayout>
				<LeftPane />
				<RightPane />
			</InterfaceLayout>
			<Player />
		</UserDataContext.Provider>
	);
};
const InterfaceLayout = styled.main`
	height: 100vh;
	width: 100vw;
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	align-items: center;
	justify-content: center;
`;
export default SpotifyInterface;
