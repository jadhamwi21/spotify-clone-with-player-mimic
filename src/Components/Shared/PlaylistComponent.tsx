import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import {
	CalculateTrackAdditionDate,
	ExtractDataFromPlaylistSingleResponse,
	FormWithPluralOrSingular,
	ModifiedSingleTrackObject,
	milliSecondsTo_Hours_Minutes_Seconds,
} from "../../helper/functions";
import FavoriteIcon from "@material-ui/icons/Favorite";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import Sticky from "react-stickynode";
import { PlaylistDataType } from "../../types/types";
interface Props {
	Playlist: SpotifyApi.SinglePlaylistResponse | null;
}

const PlaylistComponent = ({ Playlist }: Props) => {
	const [playlistData, setPlaylistData] = useState<PlaylistDataType>(null);
	useEffect(() => {
		if (Playlist !== null) {
			const playlistDataSetter = async () => {
				const data = await ExtractDataFromPlaylistSingleResponse(Playlist);
				setPlaylistData(data);
			};
			playlistDataSetter();
		}
	}, [Playlist]);
	return (
		<>
			<PlaylistDescriptionFlexbox>
				<PlaylistImage src={playlistData?.images[0].url} />
				<PlaylistDetailsContainer>
					<PlaylistTag>Playlist</PlaylistTag>
					<PlaylistDetailsIndenter>
						<PlaylistName>{playlistData?.name}</PlaylistName>
						<PlaylistDescription>
							{playlistData?.description}
						</PlaylistDescription>
						<PlaylistMetaDataContainer>
							<PlaylistMetaData>Spotify</PlaylistMetaData>
							<ConnectorElement />
							<PlaylistMetaData>
								{FormWithPluralOrSingular(
									playlistData?.followers.total,
									"like"
								)}
							</PlaylistMetaData>
							<ConnectorElement />
							<PlaylistMetaData>
								{FormWithPluralOrSingular(playlistData?.tracks.total, "song")}
							</PlaylistMetaData>
						</PlaylistMetaDataContainer>
					</PlaylistDetailsIndenter>
				</PlaylistDetailsContainer>
			</PlaylistDescriptionFlexbox>
			<PlaylistSongsAndControllerContainer>
				<PlaylistControllerContainer>
					<PlayArrowWrapper>
						<PlayArrowIcon style={{ fill: "white", transform: "scale(1.6)" }} />
					</PlayArrowWrapper>
					<FavoriteIconWrapper>
						<FavoriteIcon
							style={{ transform: "scale(1.75)", fill: "#1db954" }}
						/>
					</FavoriteIconWrapper>
					<MoreDetailsContainer>
						<ConnectorElement />
						<ConnectorElement />
						<ConnectorElement />
					</MoreDetailsContainer>
				</PlaylistControllerContainer>
				<PlaylistSongsTable>
					<TableRow>
						<NumberCell>#</NumberCell>
						<TitleHeaderCell>Title</TitleHeaderCell>
						<AlbumCell>Album</AlbumCell>
						<DateAddedCell>Date Added</DateAddedCell>
						<DurationCell>
							<AccessTimeIcon />
						</DurationCell>
					</TableRow>

					<br />

					{playlistData?.tracks.items.map(
						(item: ModifiedSingleTrackObject, index) => {
							return (
								<TableRow key={item.track.id}>
									<NumberCell>{index + 1}</NumberCell>
									<TitleCell>
										<AlbumCover src={item.albumcover} />
										<div>{item.track.name}</div>
									</TitleCell>
									<AlbumCell>{item.albumname}</AlbumCell>
									<DateAddedCell>
										{CalculateTrackAdditionDate(item.added_at) + " ago"}
									</DateAddedCell>
									<DurationCell>
										{milliSecondsTo_Hours_Minutes_Seconds(
											item.track.duration_ms
										)}
									</DurationCell>
								</TableRow>
							);
						}
					)}
				</PlaylistSongsTable>
			</PlaylistSongsAndControllerContainer>
		</>
	);
};
const PlaylistDescriptionFlexbox = styled.div`
	height: fit-content;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	width: 90%;
	margin-top: 100px;
`;
const PlaylistImage = styled.img`
	height: 225px;
	width: 225px;
	display: block;
	margin-left: 40px;
`;
const PlaylistDetailsContainer = styled.div`
	align-self: flex-end;
	width: 100%;
	margin-left: 20px;
	color: white;
`;
const PlaylistTag = styled.header`
	font-weight: 600;
	margin: 0px;
	padding: 0px;
`;
const PlaylistDetailsIndenter = styled.div`
	padding-left: 6px;
`;
const PlaylistName = styled.div`
	font-size: 80px;
	font-weight: 700;
	user-select: none;
`;
const PlaylistDescription = styled.div`
	color: rgba(255, 255, 255, 0.4);
	font-size: 13px;
	margin-top: 10px;
`;
const ConnectorElement = styled.span`
	display: inline-block;
	height: 5px;
	width: 5px;
	margin-bottom: 2px;
	margin-left: 4px;
	margin-right: 4px;
	border-radius: 50%;
	background-color: rgba(255, 255, 255, 0.4);
`;
const PlaylistMetaDataContainer = styled.div`
	color: rgba(255, 255, 255, 0.4);
	& > span:first-child {
		color: white;
		font-weight: 700;
	}
`;
const PlaylistMetaData = styled.span``;
const PlaylistSongsAndControllerContainer = styled.div`
	height: fit-content;
	min-height: 100vh;
	width: 100%;
	background-color: rgba(0, 0, 0, 0.7);
`;
const PlaylistControllerContainer = styled.section`
	display: flex;
	margin: 30px 0px;
	padding-top: 30px;
	width: fit-content;
	height: fit-content;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	padding-left: 30px;
`;
const PlayArrowWrapper = styled.div`
	height: 45px;
	width: 45px;
	padding: 5px;
	border-radius: 50%;
	background-color: #1db954;
	display: grid;
	place-items: center;
	margin-right: 2.6em;
	&:hover {
		transform: scale(1.06);
	}
`;
const FavoriteIconWrapper = styled.div`
	margin-right: 2.6em;
`;
const MoreDetailsContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	width: 40px;
	& > span {
		margin: 0px;
	}
	& > span:first-child {
		margin-right: 7px;
	}
	& > span:last-child {
		margin-left: 7px;
	}
`;
const PlaylistSongsTable = styled.table`
	width: 95%;
	color: white !important;
	height: fit-content;
	margin: 0 auto;
	color: rgba(255, 255, 255, 0.3) !important;
	border-collapse: collapse;
	& > tr:first-child {
		border-bottom: solid 1px rgba(255, 255, 255, 0.3);
		position: sticky;
		top: 50px;
		background-color: rgb(0, 0, 0);
		color: white !important;
		& td {
			padding-bottom: 10px;
		}
	}
	& > tr:not(:first-child) {
		&:hover {
			background-color: rgba(255, 255, 255, 0.2);
			color: white !important;
		}
	}
	& tr td {
		padding: 10px 20px;
	}
`;
const TableRow = styled.tr``;
const NumberCell = styled.td`
	width: 4%;
`;
const TitleHeaderCell = styled.td`
	width: 40%;
`;
const TitleCell = styled.td`
	width: 100%;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: flex-start;
	color: white !important;
`;
const AlbumCover = styled.img`
	height: 40px;
	width: 40px;
	margin-right: 10px;
`;
const AlbumCell = styled.td`
	width: 25%;
`;
const DateAddedCell = styled.td`
	width: 25%;
`;
const DurationCell = styled.td`
	width: 8%;
`;

export default PlaylistComponent;
