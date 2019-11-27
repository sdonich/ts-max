/// <reference path="base-component.ts" />
/// <reference path="../decorators/autobind.ts" />
/// <reference path="../model/project.ts" />
/// <reference path="../model/drag-drop.ts" />

namespace App {
  export class ProjectItem extends Component<HTMLUListElement, HTMLLinkElement> implements Draggable {
		private project: Project;
	
		get persons() {
			if (this.project.people === 1) {
				return '1 person';
			} else {
				return `${this.project.people} persons`;
			}
		}
	
		constructor(hostId: string, project: Project) {
			super('single-project', hostId, false, project.id);
			this.project = project;
	
			this.configure();
			this.renderContent();
		}
	
		@autobind
		dragStartHandler(event: DragEvent) {
			event.dataTransfer!.setData('text/plain', this.project.id);
			event.dataTransfer!.effectAllowed = 'move';
		}
	
		@autobind
		dragEndhandler(_event: DragEvent) {
			console.log('dragend')
		}
	
		configure() {
			this.element.addEventListener('dragstart', this.dragStartHandler);
			this.element.addEventListener('dragend', this.dragEndhandler);
		}
	
		renderContent() {
			this.element.querySelector('h2')!.textContent = this.project.title;
			this.element.querySelector('p')!.textContent = this.project.description;
			this.element.querySelector('h3')!.textContent = this.persons + ' assigned';
		}
	}
}