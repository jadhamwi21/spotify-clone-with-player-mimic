import React from "react";
import styled, { keyframes } from "styled-components";

const Loader: React.FC<{}> = () => {
	return (
		<LoaderContainer>
			<LoaderComponent>
				<div></div>
			</LoaderComponent>
		</LoaderContainer>
	);
};
const LoaderContainer = styled.div`
	height: 100vh;
	width: 100%;
	display: grid;
	place-items: center;
	background-color: black;
`;
const spin = keyframes`
0%{
    transform:rotateZ(0deg);
}
100%{
    transform:rotateZ(360deg);
}
`;
const LoaderComponent = styled.div`
	background-color: transparent;
	border: solid 2em #1db954;
	border-top-color: transparent;
	border-radius: 100%;
	height: 200px;
	width: 200px;
	animation-name: ${spin};
	animation-duration: 1s;
	animation-timing-function: linear;
	animation-iteration-count: infinite;
	& > div {
	}
`;
export default Loader;
