import { StrictMode } from 'react';
import { createRoot } from './tinyReactDom';

const root = document.getElementById('root');
if (root) {
	createRoot(root).render(
		<StrictMode>
			<h1>hello world</h1>
			<button type="button">btn</button>
		</StrictMode>,
	);
}
