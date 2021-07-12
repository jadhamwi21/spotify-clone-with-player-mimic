import { useLayoutEffect } from "react";

export const useHideScrollBar = () => {
	useLayoutEffect(() => {
		document.getElementsByTagName("body")[0].style.overflow = "hidden";
	}, []);
};
