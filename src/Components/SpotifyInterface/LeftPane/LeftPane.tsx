import React, { useContext } from "react";
import styled from "styled-components";
import SpotifyLogo from "../../../assets/SpotifyLogo.png";
import NavComponent from "./NavComponent";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import { NavAvailableSelections } from "../../../types/types";
import { UserDataContext } from "../SpotifyInterface";
interface Props {}

const LeftPane = (props: Props) => {
	const { Data, Handlers } = useContext(UserDataContext);
	return (
		<LeftPaneContainer>
			<SpotifyLogoComponent src={SpotifyLogo} />
			<NavContainer>
				<NavList>
					<NavElement
						onClick={() => {
							Handlers.NavOptionSelector(NavAvailableSelections.home);
						}}
						style={
							Data.SelectedNavOption === NavAvailableSelections.home
								? { backgroundColor: "#262626", filter: "brightness(125%)" }
								: {}
						}
					>
						<NavComponent Icon={HomeIcon}>Home</NavComponent>
					</NavElement>
					<NavElement
						onClick={() =>
							Handlers.NavOptionSelector(NavAvailableSelections.search)
						}
						style={
							Data.SelectedNavOption === NavAvailableSelections.search
								? { backgroundColor: "#262626", filter: "brightness(125%)" }
								: {}
						}
					>
						<NavComponent Icon={SearchIcon}>Search</NavComponent>
					</NavElement>
				</NavList>
			</NavContainer>
			<PlaylistHeader>Playlists</PlaylistHeader>
			<PlaylistsListContainer>
				{Data.Playlists !== null &&
					Data.Playlists.map(
						(Playlist: SpotifyApi.PlaylistObjectSimplified) => (
							<IndividualPlaylistComponent
								style={{ color: "white" }}
								onClick={() => {
									Handlers.PlaylistSelector(Playlist);
								}}
								key={Playlist.id}
							>
								{Playlist.name}
							</IndividualPlaylistComponent>
						)
					)}
			</PlaylistsListContainer>
		</LeftPaneContainer>
	);
};
const LeftPaneContainer = styled.div`
	height: 100%;
	width: 17.5vw;
	background-color: black;
`;
const SpotifyLogoComponent = styled.img`
	transform: scale(0.47) translateX(-38%);
	height: 90px;
	width: 280px;
`;
const NavContainer = styled.nav``;
const NavList = styled.ul`
	list-style-type: none;
	padding: 0px 10px;
`;
const NavElement = styled.li`
	border-radius: 6px;
	padding: 6px 20px;
	color: white;
	font-weight: 600;
	font-size: 16px;
	background-color: black;
	filter: brightness(75%);
	margin: 4px 0px;
	transition: all 0.5s ease;
	filter: brightness(75%);
	&:hover {
		cursor: pointer;
		filter: brightness(125%);
	}
`;
const PlaylistHeader = styled.header`
	display: block;
	width: 85%;
	height: fit-content;
	border-bottom: solid 0.01px #6b6e6f;
	margin: 0 auto;
	color: #6b6e6f;
	padding-bottom: 6px;
	font-weight: 600;
`;
const PlaylistsListContainer = styled.ul`
	list-style-type: none;
	padding: 0px;
	padding-left: 22px;
`;
const IndividualPlaylistComponent = styled.li`
	font-size: 1em;
`;
export default LeftPane;
