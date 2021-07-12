import React, { useContext } from "react";
import { RightPaneContext } from "../RightPane";
import ResultLister from "./ResultLister";

interface Props {}

const Search = (props: Props) => {
	const { State } = useContext(RightPaneContext);
	return (
		<div style={{ color: "white" }}>
			{State?.Loading === "initial" ? (
				<div></div>
			) : State?.Loading ? (
				<div>Loading...</div>
			) : State?.Albums.length === 0 &&
			  State?.Artists.length === 0 &&
			  State?.Songs.length === 0 ? (
				<div>No Results Found</div>
			) : State !== null ? (
				<ResultLister
					Songs={State?.Songs}
					Albums={State?.Albums}
					Artists={State?.Artists}
				/>
			) : (
				<></>
			)}
		</div>
	);
};

export default Search;
