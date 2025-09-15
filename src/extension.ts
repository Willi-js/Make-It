import * as vscode from 'vscode';
import fs from 'fs';
import path from 'path';

export function activate(context: vscode.ExtensionContext) {

	const disposable = vscode.commands.registerCommand('makeit.newfile', () => {
		const currentlyActiveFile = vscode.window.activeTextEditor;

		if(currentlyActiveFile) {
			let directory = currentlyActiveFile.document.uri.path.split("/").slice(0, -1).join("/");

			if(directory.startsWith("/")) {
				directory = directory.slice(1);
			}

			vscode.window.showInputBox({
				placeHolder: "File Name",
				prompt: "File Name",
				validateInput: (value) => {
					if(!value) {
						return "Please enter a file name";
					}

					return null;
				}
			}).then((value) => {
				if(value) {
					fs.writeFileSync(directory+"/"+value, "");

					vscode.workspace.openTextDocument(directory+"/"+value).then((doc) => {
						vscode.window.showTextDocument(doc);
					});
				}
			});

			return;
		}

		const directories = vscode.workspace.workspaceFolders;

		if(directories) {

			let dir = directories[0].uri.path;

			if(dir.startsWith("/")) {
				dir = dir.slice(1);
			}

			vscode.window.showInputBox({
				placeHolder: "File Name",
				prompt: "File Name",
				validateInput: (value) => {
					if(!value) {
						return "Please enter a file name";
					}

					return null;
				}
			}).then((value) => {
				if(value) {
					fs.writeFileSync(dir+"/"+value, "");

					vscode.workspace.openTextDocument(dir+"/"+value).then((doc) => {
						vscode.window.showTextDocument(doc);
					});
				}
			});
		}

	});

	const disp = vscode.commands.registerCommand('makeit.newfolder', () => {
		const currentlyActiveFile = vscode.window.activeTextEditor;

		if(currentlyActiveFile) {
			let directory = currentlyActiveFile.document.uri.path.split("/").slice(0, -1).join("/");

			if(directory.startsWith("/")) {
				directory = directory.slice(1);
			}

			vscode.window.showInputBox({
				placeHolder: "Directory Name",
				prompt: "Directory Name",
				validateInput: (value) => {
					if(!value) {
						return "Please enter a directory name";
					}

					return null;
				}
			}).then((value) => {
				if(value) {
					fs.mkdirSync(directory+"/"+value);
				}
			});

			return;
		}

		const directories = vscode.workspace.workspaceFolders;

		if(directories) {

			let dir = directories[0].uri.path;

			if(dir.startsWith("/")) {
				dir = dir.slice(1);
			}

			vscode.window.showInputBox({
				placeHolder: "Directory Name",
				prompt: "Directory Name",
				validateInput: (value) => {
					if(!value) {
						return "Please enter a directory name";
					}

					return null;
				}
			}).then((value) => {
				if(value) {
					fs.mkdirSync(dir+"/"+value);
				}
			});
		}
	});

	context.subscriptions.push(disp);
	context.subscriptions.push(disposable);

}

export function deactivate() {}