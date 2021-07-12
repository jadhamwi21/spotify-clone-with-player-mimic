import React from "react";
import styled from "styled-components";
import PlaybackVolume from "./PlaybackVolume";
import PlayedSong from "./PlayedSong";
import PlayerController from "./PlayerController";
import usePlayer from "../../../hooks/usePlayer";
const Player: React.FC<{}> = () => {
	const {
		SongName,
		ArtistName,
		AlbumCover,
		IsLoadingPlaybackData,
		Shuffle,
		PlayStatus,
		Repeat,
		Volume,
		DeviceAndPlaybackExistance,
		SongProgress,
		SongDuration,
	} = usePlayer();
	return (
		<PlayerContainer>
			
				{!IsLoadingPlaybackData ? (
					DeviceAndPlaybackExistance ? (
						<>
							<PlayedSong
								SongName={SongName}
								ArtistName={ArtistName}
								AlbumCover={AlbumCover}
							/>
							<PlayerController
								Shuffle={Shuffle}
								PlayStatus={PlayStatus}
								Repeat={Repeat}
								SongDuration={SongDuration}
								SongProgress={SongProgress}
							/>
							<PlaybackVolume Volume={Volume} />
						</>
					) : (
						<MessageContainer>
							No Device Or No Playback Was Found
						</MessageContainer>
					)
				) : (
					<MessageContainer>Loading...</MessageContainer>
				)}
		</PlayerContainer>
	);
};
const PlayerContainer = styled.footer`
	position: fixed;
	height: 90px;
	width: 100vw;
	bottom: 0;
	left: 0;
	background-color: #181717;
	border-top: solid 1px #3c3939;
	user-select: none;
	color: white;
	z-index: 40;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
`;
const MessageContainer = styled.div`
	margin: 0 auto;
	color: white;
	font-size: 20px;
`;
export default Player;
