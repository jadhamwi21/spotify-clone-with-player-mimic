import React from "react";
import styled from "styled-components";
interface Props {
	Songs: SpotifyApi.TrackObjectFull[] | [];
	Albums: [] | SpotifyApi.AlbumObjectSimplified[];
	Artists: [] | SpotifyApi.ArtistObjectFull[];
}

const ResultLister = ({ Songs, Albums, Artists }: Props) => {
	return (
		<Container>
			<Header>Songs :</Header>
			{Songs?.map((item) => {
				return (
					<ItemComponent>
						<RowImage src={item.album.images[0]?.url} alt="song-artwork" />
						{item.name}
					</ItemComponent>
				);
			})}
			<Header>Albums :</Header>
			{Albums?.map((item) => {
				return (
					<ItemComponent>
						<RowImage src={item.images[0]?.url} alt="album-artwork" />
						{item.name}
					</ItemComponent>
				);
			})}
			<Header>Artists :</Header>
			{Artists?.map((item) => {
				return (
					<ItemComponent>
						<RowImage src={item.images[0]?.url} alt="artist-image" />
						{item.name}
					</ItemComponent>
				);
			})}
		</Container>
	);
};
const Container = styled.div`
	user-select: none;
`;
const Header = styled.h2`
	color: white;
	margin-right: 6em;
`;
const ItemComponent = styled.div`
	color: white;
	padding: 20px 60px;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: flex-start;
	&:hover {
		background-color: rgba(255, 255, 255, 0.2);
	}
`;
const RowImage = styled.img`
	height: 60px;
	width: 60px;
	border-radius: 4px;
	margin-right: 40px;
`;

export default ResultLister;
