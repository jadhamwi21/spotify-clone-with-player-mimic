import React from "react";
import styled from "styled-components";
interface Props {
	children: string | React.ReactElement;
	style?: React.CSSProperties;
	link?: string;
}

const ButtonComponent = ({ children, style, link }: Props) => {
	return (
		<StyledButton style={style} href={link}>
			{children}
		</StyledButton>
	);
};
const StyledButton = styled.a`
	border: none;
	padding: 20px 30px;
	border-radius: 25px;
	text-transform: uppercase;
	font-weight: 700;
	color: white;
	text-decoration: none;
	letter-spacing: 0.6px;
	&:hover {
		cursor: pointer;
		filter: brightness(110%);
	}
`;
export default ButtonComponent;
