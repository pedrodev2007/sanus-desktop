use tauri::AppHandle;
//use tauri::Manager;
use tauri_plugin_global_shortcut::{Code, GlobalShortcutExt, ShortcutState, Shortcut};

pub mod handlers;

pub fn init_shortcuts(app: &AppHandle) -> Result<(), Box<dyn std::error::Error>> {
	let f3_shortcut = Shortcut::new(None, Code::F3); // vai para o estoque, com foco na barra de busca
	let esc_shortcut = Shortcut::new(None, Code::Escape); // fecha modais
				
	app.global_shortcut().on_shortcut(f3_shortcut, |app, _shortcut, event| {
		if event.state() == ShortcutState::Pressed {
			handlers::go_to_window(app, "estoque");
			}
		})?;
		
	app.global_shortcut().on_shortcut(esc_shortcut, |app, _shortcut, event| {
		if event.state() == ShortcutState::Pressed {
			handlers::escape(app);
			}
		})?;
	
	Ok(())
}
