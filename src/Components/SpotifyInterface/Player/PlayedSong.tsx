import React from "react";
import styled from "styled-components";
interface Props {
	AlbumCover: string;
	ArtistName: string;
	SongName: string;
}

// https://townsquare.media/site/295/files/2015/07/EastWest.jpe?w=980&q=75
const PlayedSong = ({ AlbumCover, ArtistName, SongName }: Props) => {
	return (
		<PlayedSongContainer>
			<SongAlbumArtwork src={AlbumCover} />
			<PlayedSongDetailsContainer>
				<PlayedSongName>{SongName}</PlayedSongName>
				<PlayedSongArtist>{ArtistName}</PlayedSongArtist>
			</PlayedSongDetailsContainer>
		</PlayedSongContainer>
	);
};
const PlayedSongContainer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	margin-left: 20px;
`;
const SongAlbumArtwork = styled.img`
	display: block;
	height: 60px;
	width: 60px;
	margin-right: 1em;
`;
const PlayedSongDetailsContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
`;
const PlayedSongName = styled.div`
	font-size: 14px;
	color: white;
`;
const PlayedSongArtist = styled.div`
	font-size: 10px;
	color: #b9b5b5;
`;

export default PlayedSong;
