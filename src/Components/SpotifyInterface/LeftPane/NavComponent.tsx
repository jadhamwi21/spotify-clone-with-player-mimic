import React from "react";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import { SvgIconTypeMap } from "@material-ui/core";
import styled from "styled-components";

interface Props {
	children: string | React.ReactElement;
	Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
}

const NavComponent = ({ children, Icon }: Props) => {
	return (
		<>
			<IconWrapper>
				<Icon style={{ fill: "#fff", transform: "scale(1.1)" }} />
			</IconWrapper>
			<IconLabel>{children}</IconLabel>
		</>
	);
};
const IconWrapper = styled.span``;
const IconLabel = styled.span`
	position: relative;
	left: 20px;
	top: -6px;
`;

export default NavComponent;
