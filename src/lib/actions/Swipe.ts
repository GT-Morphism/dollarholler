import type { Action } from "svelte/action";
import { spring } from "svelte/motion";

interface SwipeProps {
	triggerReset?: boolean;
}

export const swipe: Action<HTMLElement, SwipeProps> = (node, params) => {
	let x: number;
	// needed to store the event.clientX value upon clicking on an invoice row;
	let startingX: number;
	let elementWidth: number = node.clientWidth;
	const coordinates = spring({ x: 0, y: 0 }, { stiffness: 0.2, damping: 0.4 });

	// #region add swipe funtioncality only on mobile devices
	function isMobileBreakpoint() {
		const mediaQuery = window.matchMedia("(max-width: 1024px)");

		if (mediaQuery.matches) {
			return true;
		} else {
			return false;
		}
	}

	function setupEventListeners() {
		elementWidth = node.clientWidth;

		if (isMobileBreakpoint()) {
			node.addEventListener("pointerdown", handlePointerDown);
			// to prevent the default behavior of touch event (which is scrolling)
			node.addEventListener("touchmove", handleTouchMove);
		} else {
			node.removeEventListener("pointerdown", handlePointerDown);
			node.removeEventListener("touchmove", handleTouchMove);
		}
	}

	function handleTouchMove(event: TouchEvent) {
		event.preventDefault();
	}

	// on page load
	setupEventListeners();

	// on window resize
	window.addEventListener("resize", () => {
		setupEventListeners();
	});
	// #endregion

	coordinates.subscribe(($coords) => {
		node.style.transform = `translate3d(${$coords.x}px, 0, 0)`;
	});

	function handlePointerDown(event: PointerEvent) {
		console.log("started");

		// x is used by both handlePointerMove and handlePointerUp;
		x = event.clientX;
		// startingX is only used by moveCardOver inside of handlePointerUp;
		startingX = event.clientX;

		window.addEventListener("pointermove", handlePointerMove);
		window.addEventListener("pointerup", handlePointerUp);
	}

	function handlePointerMove(event: PointerEvent) {
		const dx: number = event.clientX - x;
		x = event.clientX;

		coordinates.update(($coords) => {
			return {
				x: $coords.x + dx,
				y: 0
			};
		});
	}

	function handlePointerUp(event: PointerEvent) {
		const endingX = event.clientX;
		moveCardOver(endingX);

		console.log("stopped");
		window.removeEventListener("pointermove", handlePointerMove);
		window.removeEventListener("pointerup", handlePointerUp);
	}

	function moveCardOver(endingX: number) {
		const leftSnapX = elementWidth * -0.95;
		const rightSnapX = 0;

		const movement = startingX - endingX;

		// so that left swipe is intentional (and not by accident);
		if (movement > 20) {
			x = leftSnapX;
			outOfView();
		} else {
			x = rightSnapX;
		}

		coordinates.update(() => {
			return {
				x: x,
				y: 0
			};
		});
	}

	function resetCard() {
		coordinates.update(() => {
			return { x: 0, y: 0 };
		});
	}

	function outOfView() {
		node.dispatchEvent(new CustomEvent("outOfView"));
	}

	return {
		update(newParams: SwipeProps) {
			if (newParams.triggerReset) {
				resetCard();
			}
		},

		destroy() {
			node.removeEventListener("pointerdown", handlePointerDown);
			node.removeEventListener("touchmove", handleTouchMove);
		}
	};
};
