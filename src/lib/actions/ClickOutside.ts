import assertsIsNode from "$lib/utils/assertsIsNode";
import type { Action } from "svelte/action";

export const clickOutside: Action<HTMLElement, () => void> = (node, runFunction) => {
	const handleClick = (event: MouseEvent | TouchEvent) => {
		assertsIsNode(event.target);
		if (!node.contains(event.target)) {
			if (runFunction) runFunction();
		}
	};

	document.addEventListener("click", handleClick, true);

	return {
		destroy() {
			document.removeEventListener("click", handleClick, true);
		}
	};
};
