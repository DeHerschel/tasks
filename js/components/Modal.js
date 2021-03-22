import Alert from "./Alert.js";

export default class Modal {
    constructor() {
		this.title = document.getElementById('modal-title');
		this.description = document.getElementById('modal-description');
		this.savebtn = document.getElementById('modal-btn');
		this.completed = document.getElementById('modal-completed');	
		this.task = null;
		this.alert = new Alert('modal-alert');
	}
	setValues(task) {
		this.task = task;
		this.title.value = task.title;
		this.description.value = task.description;
		this.completed.checked = task.completed;
	}
	onclick(callback) {
		this.savebtn.onclick = () => {
			if (!this.title.value) {
				this.alert.show("Title is required")
				return
			}
			$('#modal').modal('toggle');
			callback(this.task.id, {
				title: this.title.value,
				description: this.description.value,
				completed: this.completed.checked
			})
		}
	}
}