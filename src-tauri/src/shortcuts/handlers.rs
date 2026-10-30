use tauri::{AppHandle, Manager};

// por enquanto, tá tudo nesse arquivo. Se crescer muito, vai ter que deixar isso mais "modularizado"

pub fn go_to_window(app: &AppHandle) {
	println!("teste");
	}

pub fn add_item(app: &AppHandle) {
	println!("item adicionado");
	}

pub fn escape(app: &AppHandle) {
	println!("voltar (escape)");
	}
