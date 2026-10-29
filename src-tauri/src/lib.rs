pub fn run() {
  tauri::Builder::default()
    .setup(|app| {
      #[cfg(desktop)]
      {
        use tauri_plugin_global_shortcut::{Code, GlobalShortcutExt, Modifiers, Shortcut, ShortcutState};

        let ctrl_a_shortcut = Shortcut::new(Some(Modifiers::CONTROL), Code::KeyA);
        app.handle().plugin(
          tauri_plugin_global_shortcut::Builder::new().with_handler(move |_app, shortcut, event| {
            println!("{:?}", shortcut);
            if shortcut == &ctrl_a_shortcut {
              match event.state() {
                ShortcutState::Pressed => {
                  println!("PRODUTO ADICIONADO (experimental)");
                }
                ShortcutState::Released => {
                  println!("SOLTOU O CTRL-N");
                }
              }
            }
          })
          .build(),
        )?;

        app.global_shortcut().register(ctrl_a_shortcut)?;
      }
      Ok(())
    })
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
// é apenas um teste, não refletindo a versão final

/*

SHORTCUTS necessários:

F3 -> consultar preço rapidamente;
F7 -> cancelar item atual (precisa de senha);
F8 -> cancelar venda atual (precisa de senha);
ESC -> voltar
CNTRL + A -> adicionar produto 

*/