import styled from "styled-components";
import React, { useContext } from "react";
import Topbar from "../Topbar/Topbar";
import { UserDataContext } from "../SpotifyInterface";
import { NavAvailableSelections } from "../../../types/types";
import Home from "./Home/Home";
import PlaylistComponent from "../../Shared/PlaylistComponent";
import Search from "./Search/Search";
import useSelectPlaylist from "../../../hooks/useSelectPlaylist";
import useSearch, { SearchState } from "../../../hooks/useSearch";
import useClearSearchField from "../../../hooks/useClearSearchField";
interface RightPaneContextInterface {
	State: SearchState | null;
	Handlers: {
		InputFieldHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
	} | null;
}
export const RightPaneContext = React.createContext<RightPaneContextInterface>({
	State: null,
	Handlers: null,
});
const RightPane = () => {
	const { Data } = useContext(UserDataContext);
	const playlist = useSelectPlaylist({ Data });
	const { State, Handlers } = useSearch();
	useClearSearchField(Data.SelectedNavOption, Handlers.InputFieldHandler);
	return (
		<RightPaneContext.Provider
			value={{
				State,
				Handlers,
			}}
		>
			<RightPaneContainer>
				<Topbar />
				{Data.SelectedNavOption === NavAvailableSelections.home && <Home />}
				{Data.SelectedPlaylist !== null && (
					<PlaylistComponent Playlist={playlist} />
				)}
				{Data.SelectedNavOption === NavAvailableSelections.search && <Search />}
			</RightPaneContainer>
		</RightPaneContext.Provider>
	);
};
const RightPaneContainer = styled.div`
	height: calc(100vh - 90px);
	width: calc(100vw - 17.5vw);
	position: relative;
	overflow-y: scroll;
	align-self: flex-start;
	background: rgb(0, 0, 0);
	background: linear-gradient(
		0deg,
		rgba(0, 0, 0, 1) 0%,
		rgba(69, 66, 66, 1) 0%,
		rgba(17, 17, 17, 1) 100%
	);
`;

export default RightPane;
