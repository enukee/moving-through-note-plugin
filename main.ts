import { Plugin, MarkdownView } from 'obsidian';

export default class MoveThroughNotePlugin extends Plugin {
	async onload() {
		console.log('Loading Move Through Note plugin');

		this.setActiveLeafOnStartup();

		// Добавляем кнопку для перемещения курсора в начало документа
		this.addRibbonIcon('circle-chevron-up', 'Move to Start', () => {
			const leaf = this.app.workspace.getActiveViewOfType(MarkdownView);
			if (leaf) {
				const editor = leaf.editor;
				editor.setCursor(0, 0);
			}
		});

		// Добавляем кнопку в редактор
		this.addRibbonIcon('circle-chevron-down', 'Move to End', () => {
			const leaf = this.app.workspace.getActiveViewOfType(MarkdownView);
			if (leaf) {
				const editor = leaf.editor;
				const doc = editor.getDoc();
				const lastLine = doc.lastLine();
				editor.setCursor(lastLine, doc.getLine(lastLine).length);
			}
		});
	}

	// Метод для установки первого листа активным при запуске плагина
	setActiveLeafOnStartup() {
		const leaves = this.app.workspace.getLeavesOfType('MarkdownView');
		if (leaves.length > 0) {
			const leafToActivate = leaves[0]; // Выбираем первый лист для примера
			this.app.workspace.setActiveLeaf(leafToActivate, { focus: true });
			console.log('Set active leaf to:', leafToActivate);
		}
	}

	onunload() {
		console.log('Unloading Through Note plugin');
	}
}
