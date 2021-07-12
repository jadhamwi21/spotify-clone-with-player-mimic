import React from "react";
import styled from "styled-components";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import PlayerButton from "./PlayerButton";
import ShuffleIcon from "@material-ui/icons/Shuffle";
import RepeatIcon from "@material-ui/icons/Repeat";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import PauseCircleFilledIcon from "@material-ui/icons/PauseCircleFilled";
import { RepeatStateENUM } from "../../../types/types";
import {
	milliSecondsTo_Hours_Minutes_Seconds,
	ProgressBarWidthCalculator,
} from "../../../helper/functions";
interface Props {
	Repeat: string;
	Shuffle: boolean;
	PlayStatus: boolean;
	SongDuration: number;
	SongProgress: number;
}
const PlayerController = ({
	Repeat,
	Shuffle,
	PlayStatus,
	SongDuration,
	SongProgress,
}: Props) => {
	return (
		<PlayerControllerContainer>
			<PlayerButtonsFlexbox>
				<PlayerButton
					height="22px"
					width="22px"
					Icon={ShuffleIcon}
					fill={Shuffle ? "#1db954" : undefined}
				/>
				<PlayerButton height="22px" width="22px" Icon={SkipPreviousIcon} />
				<PlayerButton
					height="40px"
					width="40px"
					fill="white"
					scale={true}
					Icon={PlayStatus ? PauseCircleFilledIcon : PlayCircleFilledIcon}
				/>
				<PlayerButton height="22px" width="22px" Icon={SkipNextIcon} />

				<PlayerButton
					height="22px"
					width="22px"
					Icon={RepeatIcon}
					fill={Repeat !== RepeatStateENUM.Off ? "#1db954" : undefined}
				>
					{Repeat === RepeatStateENUM.Track ? (
						<RepeatButtonBanner>
							<div>1</div>
						</RepeatButtonBanner>
					) : (
						<></>
					)}
				</PlayerButton>
			</PlayerButtonsFlexbox>
			<ControlBarContainer>
				<TimeCell>
					{milliSecondsTo_Hours_Minutes_Seconds(SongProgress)}
				</TimeCell>
				<Bar width="450px">
					<BarProgress
						width={ProgressBarWidthCalculator(SongProgress, SongDuration)}
					>
						<BarController />
					</BarProgress>
				</Bar>
				<TimeCell>
					{milliSecondsTo_Hours_Minutes_Seconds(SongDuration)}
				</TimeCell>
			</ControlBarContainer>
		</PlayerControllerContainer>
	);
};
const PlayerControllerContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	margin-right: 40px;
`;
const PlayerButtonsFlexbox = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	width: 200px;
`;
const ControlBarContainer = styled.div`
	width: fit-content;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
`;
const TimeCell = styled.div`
	height: fit-content;
	width: fit-content;
	color: white;
	font-size: 12px;
`;
interface BarProps {
	width: string;
}
const RepeatButtonBanner = styled.div`
	position: absolute;
	top: 0;
	right: 0;
	height: 10px;
	width: 10px;
	border-radius: 50%;
	background-color: #1db954;
	color: black;
	font-size: 8px;
	font-weight: 800;
	text-align: center;
	display: grid;
	place-items: center;
`;
export const Bar = styled.div<BarProps>`
	height: 6px;
	background-color: #3c3939;
	width: ${(props) => props.width};
	position: relative;
	margin: 12px;
	border-radius: 10px;
	&:hover {
		& > div {
			background-color: #1db954;
			& > div {
				visibility: visible;
			}
		}
	}
`;
export const BarProgress = styled.div<{ width: number }>`
	height: 100%;
	width: ${(props) => props.width + "%"};
	background-color: gray;
	border-radius: 10px;
	position: relative;
	transition: width 0.1s ease;
`;
export const BarController = styled.div`
	position: absolute;
	bottom: -2px;
	right: -5px;
	background-color: white;
	height: 10px;
	width: 10px;
	border-radius: 50%;
	visibility: hidden;
`;

export default PlayerController;
