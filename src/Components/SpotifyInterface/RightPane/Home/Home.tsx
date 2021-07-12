import React, { useContext } from "react";
import styled from "styled-components";
import { UserDataContext } from "../../SpotifyInterface";
import PlaylistComponent from "../../../Shared/PlaylistComponent";
interface Props {}

const Home = (props: Props) => {
	const { Data } = useContext(UserDataContext);
	return (
		<div>
			<PlaylistComponent Playlist={Data.DiscoverWeekly} />
		</div>
	);
};

export default Home;
