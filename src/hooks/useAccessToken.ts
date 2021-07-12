import { useEffect, useState } from "react";
import { Delay } from "../helper/functions";
import {
	HashReturnedValuesType,
	extractAccessToken,
	spotify,
} from "../Spotify/spotify";
import { MeType } from "../types/types";
export const useAccessToken = (): [string, boolean, MeType] => {
	const [token, setToken] = useState<string>("");
	const [me, setMe] = useState({} as MeType);
	const [isLoadingToken, setIsLoadingToken] = useState(() => {
		if (window.location.hash !== "") {
			return true;
		} else {
			return false;
		}
	});
	useEffect(() => {
		const hash = window.location.hash;
		window.location.hash = "";
		if (hash !== "") {
			const HashValues: HashReturnedValuesType = extractAccessToken(hash);
			if (HashValues["access_token"]) {
				setToken(HashValues["access_token"]);
			}
		}
	}, []);
	useEffect(() => {
		if (token !== "") {
			spotify.setAccessToken(token);
			const _delayed_setLoadingToFalse = async () => {
				const Me = await spotify.getMe();
				setMe(Me);
				await Delay(0.5);
				setIsLoadingToken(false);
			};
			_delayed_setLoadingToFalse();
		}
	}, [token]);
	return [token, isLoadingToken, me];
};
