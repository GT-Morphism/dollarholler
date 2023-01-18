// From https://github.com/sveltejs/language-tools/blob/master/docs/preprocessors/typescript.md

declare namespace svelteHTML {
	// enhance attributes
	interface HTMLAttributes<HTMLDivElement> {
		"on:outOfView"?: (event: CustomEvent) => void;
	}
}
