export default function assertsIsNode(e: EventTarget | null): asserts e is Node {
	if (!e || !("nodeType" in e)) {
		throw new Error("Node expected");
	}
}
