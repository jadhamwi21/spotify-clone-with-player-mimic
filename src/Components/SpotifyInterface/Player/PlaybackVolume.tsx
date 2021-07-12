import React from "react";
import styled from "styled-components";
import { Bar, BarProgress, BarController } from "./PlayerController";
import VolumeDownIcon from "@material-ui/icons/VolumeDown";
import LyricsIcon from "@material-ui/icons/MenuBook";
interface Props {
	Volume: number;
}

const PlaybackVolume = ({ Volume }: Props) => {
	return (
		<PlaybackVolumeAndLyricsContainer>
			<PlaybackVolumeAndLyricsWrapper>
				<LyricsButton>
					<LyricsIcon style={{ fill: "gray", height: "20px", width: "20px" }} />
				</LyricsButton>
				<VolumeDownIcon style={{ fill: "gray" }} />
				<Bar width="100px" style={{ margin: "0px", marginRight: "20px" }}>
					<BarProgress width={Volume}>
						<BarController />
					</BarProgress>
				</Bar>
			</PlaybackVolumeAndLyricsWrapper>
		</PlaybackVolumeAndLyricsContainer>
	);
};
const PlaybackVolumeAndLyricsContainer = styled.div`
	display: grid;
	place-items: center;
`;
const PlaybackVolumeAndLyricsWrapper = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
`;
const LyricsButton = styled.div`
	position: relative;
	transition: all 0.5s ease;
	top: 2px;
	&:hover {
		filter: brightness(150%);
	}
`;

export default PlaybackVolume;
