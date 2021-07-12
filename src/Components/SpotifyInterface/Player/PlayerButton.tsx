import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import { SvgIconTypeMap } from "@material-ui/core/SvgIcon";
import React from "react";
import styled from "styled-components";
interface Props {
	Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
	height: string;
	width: string;
	fill?: string;
	children?: React.ReactElement;
	scale?: boolean;
}

const PlayerButton = ({
	Icon,
	height,
	width,
	fill,
	children,
	scale,
}: Props) => {
	return (
		<ButtonContainer
			height={height}
			width={width}
			scale={scale === undefined ? false : scale}
		>
			<Icon
				style={{ height: "100%", width: "100%", fill: fill ? fill : "#8C8888" }}
			/>
			{children}
		</ButtonContainer>
	);
};
interface styledComponentsProp {
	height?: string;
	width?: string;
	scale?: boolean;
}
const ButtonContainer = styled.div<styledComponentsProp>`
	height: ${(props) => props.height};
	width: ${(props) => props.width};
	transition: all 0.5s ease;
	position: relative;
	transition: transform 20ms linear;
	&:hover {
		filter: brightness(200%);
	}
	&:active {
		transform: ${(props) => (props.scale ? `scale(0.95)` : `initial`)};
	}
`;

export default PlayerButton;
