use tauri::AppHandle;
use tauri_plugin_global_shortcut::{Code, GlobalShortcutExt, Modifiers, Shortcut};

pub mod handlers;

pub fn init_shortcuts(app: &AppHandle) -> Result<(), Box<dyn std::error::Error>> {
	let f3_shortcut = Shortcut::new(None, Code::F3); // vai para o estoque, com foco na barra de busca
	let ctrl_a_shortcut = Shortcut::new(Some(Modifiers::CONTROL, Code::KeyA)); // abre o modal de adicionar produto, com foco na barra de busca
	let esc_shortcut = Shortcut::new(None, Code::Escape); // fecha modais ou sai do foco de campos de busca, checkbox, combobox ou alguma outra coisa do tipo
	
	//registrando shortcuts
	app.global_shortcut().register(f3_shortcut)?;
	app.global_shortcut().register(ctrl_a_shortcut)?;
	app.global_shortcut().register(esc_shortcut)?;
	
	app.handle().plugin(
		tauri_plugin_global_shortcut::Builder::new()
			.with_handler(move |_app, shortcut, event| {
				if event.state() == tauri_plugin_global_shortcut::ShortcutState::Pressed {
					if shortcut.matches(None, Code::F3) {
						handlers::go_to_window(_app, "estoque");
						}
					if shortcut.matches(Some(Modifiers::CONTROL), Code::KeyA) {
						handlers::add_item(_app);
						}
					if shortcut.matches(None, Code::Escape) {
						handlers::escape(_app);
						}
					}
				})
				.build(),
	)?;
	Ok(())
}



/*

SHORTCUTS necessários:

F3 -> consultar preço rapidamente;
F7 -> cancelar item atual (precisa de senha);
F8 -> cancelar venda atual (precisa de senha);
ESC -> voltar
CNTRL + A -> adicionar produto

*/
