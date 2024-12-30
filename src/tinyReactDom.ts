import type { ReactNode } from 'react';
import ReactReconciler from 'react-reconciler';

const noop = () => {};
// @ts-ignore
const reconciler = ReactReconciler({
	getCurrentEventPriority: () => 1,
	clearContainer: noop,

	supportsMutation: true,
	createInstance(type: string, props) {
		const element = document.createElement(type);
		for (const attr of ['alt', 'className', 'href', 'rel', 'src', 'target']) {
			// @ts-ignore
			if (props[attr]) element[attr] = props[attr];
		}
		return element;
	},
	createTextInstance: (text) => document.createTextNode(text),
	appendChildToContainer(container: HTMLElement, child: HTMLElement | Text) {
		container.appendChild(child);
	},
	appendChild(parent: HTMLElement, child: HTMLElement | Text) {
		parent.appendChild(child);
	},
	appendInitialChild(parent: HTMLElement, child: HTMLElement | Text) {
		parent.appendChild(child);
	},
	finalizeInitialChildren: () => false,
	getChildHostContext: noop,
	getRootHostContext: noop,
	prepareForCommit: () => null,
	resetAfterCommit: noop,
	shouldSetTextContent: () => false,
});

export const createRoot = (root: HTMLElement) => ({
	render(whatToRender: ReactNode) {
		const container = reconciler.createContainer(
			root,
			1,
			null,
			false,
			false,
			'',
			console.error,
			null,
		);

		reconciler.updateContainer(whatToRender, container, null, null);
	},
});
