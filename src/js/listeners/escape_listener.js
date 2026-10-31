import { getCurrentWebviewWindow } from '@tauri-apps/api/webviewWindow';
const MODAIS = document.querySelectorAll('dialog');

const appWebview = getCurrentWebviewWindow();
appWebview.listen('escape', (e) => {
	for (const M of MODAIS) {
		if (M.open) {
			M.close();
			break;
			}
		}
	});
