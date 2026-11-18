const { getCurrentWindow } = window.__TAURI__.window;


const appWebview = getCurrentWindow();
appWebview.listen('going_to', (e) => {
	window.location.href = e.payload;
	});
