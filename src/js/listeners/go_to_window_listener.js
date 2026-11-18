const { getCurrentWindow } = window.__TAURI__.window;

const appWindow = getCurrentWindow();
appWindow.listen('going_to', (e) => {
	window.location.href = e.payload;
	});
