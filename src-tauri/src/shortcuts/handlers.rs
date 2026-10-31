use tauri::{AppHandle, Manager, Emitter};

// por enquanto, tá tudo nesse arquivo. Se crescer muito, vai ter que deixar isso mais "modularizado"

pub fn go_to_window(app: &AppHandle, window: String) {
	let path = format!("/{}/index.html", window);
	app.emit_to("main", "going_to", path);
	}

pub fn add_item(app: &AppHandle) {
	println!("item adicionado");
	}

pub fn escape(app: &AppHandle) {
	println!("voltar (escape)");
	}
