import type { Action } from "svelte/action";

function assertsIsNode(e: EventTarget | null): asserts e is Node {
	if (!e || !("nodeType" in e)) {
		throw new Error("Node expected");
	}
}

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
