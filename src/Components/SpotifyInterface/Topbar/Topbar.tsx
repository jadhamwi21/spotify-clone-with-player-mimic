import React, { useContext } from "react";
import styled from "styled-components";
import { UserDataContext } from "../SpotifyInterface";
import SearchIcon from "@material-ui/icons/Search";
import { SpotifyMeContext } from "../../../App";
import { NavAvailableSelections } from "../../../types/types";
import { RightPaneContext } from "../RightPane/RightPane";
interface Props {}
const Topbar = (props: Props) => {
	const { Data } = useContext(UserDataContext);
	const Me = useContext(SpotifyMeContext);
	const { State, Handlers } = useContext(RightPaneContext);
	return (
		<TopbarContainer>
			<TopbarFlex>
				<SearchBoxContainer>
					{Data.SelectedNavOption === NavAvailableSelections.search && (
						<>
							<SearchBox
								placeholder="Artists,songs,or podcasts"
								value={State?.FieldValue}
								onChange={Handlers?.InputFieldHandler}
							/>
							<SearchIconWrapper>
								<SearchIcon style={{ fill: "black" }} />
							</SearchIconWrapper>
						</>
					)}
				</SearchBoxContainer>
				<UserDetailsContainer>
					<ProfilePicture
						src={
							Me?.images?.length !== 0 && Me?.images !== undefined
								? Me.images[0].url
								: ""
						}
					/>
					<UserName>{Me?.display_name}</UserName>
				</UserDetailsContainer>
			</TopbarFlex>
		</TopbarContainer>
	);
};

const TopbarContainer = styled.div`
	color: white;
	height: 60px;
	width: 100%;
	position: sticky;
	z-index: 10;
	top: 0px;
	right: 0px;
	background-color: black;
	display: grid;
	place-items: center;
`;
const TopbarFlex = styled.div`
	width: 90%;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	margin-top: 5px;
`;
const SearchBoxContainer = styled.div`
	position: relative;
	height: fit-content;
	width: fit-content;
`;
const SearchBox = styled.input`
	background-color: white;
	width: 300px;
	height: 37px;
	padding: 0px;
	padding-left: 40px;
	outline: none;
	border-radius: 40px;
	border: none;
	font-size: 15px;
`;
const SearchIconWrapper = styled.div`
	height: 50px;
	width: 50px;
	position: absolute;
	left: 10px;
	top: 6.5px;
`;
const UserDetailsContainer = styled.div`
	border-color: transparent;
	display: flex;
	flex-direction: row;
	place-items: center;
	height: fit-content;
	width: fit-content;
`;
const ProfilePicture = styled.img`
	height: 100%;
	width: 100%;
	border-radius: 50px;
	height: 2em;
	width: 2em;
	border-radius: 50px;
`;
const UserName = styled.span`
	margin-left: 10px;
	font-weight: 600;
`;
export default Topbar;
