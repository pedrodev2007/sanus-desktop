const { getCurrentWindow } = window.__TAURI__.window;
const MODAIS = document.querySelectorAll('dialog');

const appWindow = getCurrentWindow();
appWindow.listen('escape', (e) => {
	for (const M of MODAIS) {
		if (M.open) {
			M.close();
			break;
			}
		}
	});
