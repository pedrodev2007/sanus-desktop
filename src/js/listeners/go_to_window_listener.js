import { getCurrentWebviewWindow } from '@tauri-apps/api/webviewWindow';

const appWebview = getCurrentWebviewWindow();
appWebview.listen('going_to', (e) => {
	window.location.href = e.payload;
	});
