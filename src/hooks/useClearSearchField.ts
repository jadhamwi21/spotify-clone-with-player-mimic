import React, { useEffect } from "react";
import { NavAvailableSelections } from "../types/types";

const useClearSearchField = (
	NavOption: NavAvailableSelections,
	SearchFieldValueChanger: (
		e: React.ChangeEvent<HTMLInputElement> | string
	) => void
) => {
	useEffect(() => {
		SearchFieldValueChanger("");
	}, [NavOption]);
};

export default useClearSearchField;
