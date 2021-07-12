import React from "react";
import styled from "styled-components";
import SpotifyImage from "../../assets/SpotifyLogo.png";
import { Form_Spotify_Auth_URI } from "../../Spotify/spotify";
import ButtonComponent from "../Shared/ButtonComponent";
interface Props {}
const Login = (props: Props) => {
	return (
		<HomeContainer>
			<HomeComponentsWrapper>
				<SpotifyLogoElement src={SpotifyImage} />
				<ButtonComponent
					style={{ backgroundColor: "#1DB954" }}
					link={Form_Spotify_Auth_URI()}
				>
					Login To Spotify
				</ButtonComponent>
			</HomeComponentsWrapper>
		</HomeContainer>
	);
};
const HomeContainer = styled.div`
	height: 100vh;
	width: 100vw;
	background-color: black;
	display: grid;
	place-items: center;
`;
const HomeComponentsWrapper = styled.div`
	width: fit-content;
	height: 80%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
`;
const SpotifyLogoElement = styled.img`
	height: 200px;
	width: 100%;
	transform: scale(0.8);
`;

export default Login;
