import type { Action } from "svelte/action";
import { spring } from "svelte/motion";

interface SwipeProps {
	triggerReset?: boolean;
}

export const swipe: Action<HTMLElement, SwipeProps> = (node, params) => {
	let x: number;
	// needed to store the event.clientX value upon clicking on an invoice row;
	let startingX: number;
	const elementWidth = node.clientWidth;
	const coordinates = spring({ x: 0, y: 0 }, { stiffness: 0.2, damping: 0.4 });

	function resetCard() {
		coordinates.update(() => {
			return { x: 0, y: 0 };
		});
	}

	function outOfView() {
		node.dispatchEvent(new CustomEvent("outOfView"));
	}

	coordinates.subscribe(($coords) => {
		node.style.transform = `translate3d(${$coords.x}px, 0, 0)`;
	});

	node.addEventListener("mousedown", handleMouseDown);

	function handleMouseDown(event: MouseEvent) {
		console.log("started");

		// x is used by both handleMouseMove and handleMouseUp;
		x = event.clientX;
		// startingX is only used by moveCardOver inside of handleMouseUp;
		startingX = event.clientX;

		window.addEventListener("mousemove", handleMouseMove);
		window.addEventListener("mouseup", handleMouseUp);
	}

	function handleMouseMove(event: MouseEvent) {
		const dx: number = event.clientX - x;
		x = event.clientX;

		coordinates.update(($coords) => {
			return {
				x: $coords.x + dx,
				y: 0
			};
		});
	}

	function handleMouseUp(event: MouseEvent) {
		const endingX = event.clientX;
		moveCardOver(endingX);

		console.log("stopped");
		window.removeEventListener("mousemove", handleMouseMove);
		window.removeEventListener("mouseup", handleMouseUp);
	}

	function moveCardOver(endingX: number) {
		const leftSnapX = elementWidth * -0.95;
		const rightSnapX = 0;

		const movement = startingX - endingX;

		// so that left swipe is intentional (and not by accident);
		if (movement > 20) {
			x = leftSnapX;
			outOfView();
		}
		// like above; interchange left with right;
		else {
			x = rightSnapX;
		}

		coordinates.update(() => {
			return {
				x: x,
				y: 0
			};
		});
	}

	return {
		update(newParams: SwipeProps) {
			if (newParams.triggerReset) {
				resetCard();
			}
		},

		destroy() {
			node.removeEventListener("mousedown", handleMouseDown);
		}
	};
};
