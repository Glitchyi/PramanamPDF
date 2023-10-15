// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]



// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn readdir(path: &str) -> String{
    let mut file: String = String::new();
    for entry in std::fs::read_dir(path).unwrap() {
        let dir = entry.unwrap();
        println!("{:?}", dir.path());
        file.push_str(dir.path().to_str().unwrap());
    }
    file
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet,readdir])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

