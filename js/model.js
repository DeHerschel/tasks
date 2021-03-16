export default class Model {
	constructor() {
		this.view = null;
		this.tasks = JSON.parse(localStorage.getItem('tasks'));
		if (!this.tasks || this.tasks.length < 1) {
			this.tasks = [
				{
					id: 0,
					title: 'Welcome',
					description: 'Write here your tasks',
					completed: false
				}
			]
			this.currentId = 1;
		} else {
			this.currentId = this.tasks[this.tasks.length - 1].id + 1;
		}
	}
	setView(view) {
		this.view = view;
	}
	save() {
		localStorage.setItem('tasks', JSON.stringify(this.tasks));
	}
	getTasks() {
		return this.tasks;
	}
	findTask(id) {
		return this.tasks.findIndex((task) => task.id === id);
	}
	addTask(title, description) {
		const task = {
			id: this.currentId++,
			title,
			description,
			completed: false
		}
		this.tasks.push(task);
		console.log("hello");
		this.save();
		return {...task}; //expand object
	}
	removeTask(id) {
		const index = this.findTask(id);
		this.tasks.splice(index, 1);
		this.save();
	}
	toggleCompleted(id) {
		const index = this.findTask(id);
		const task = this.tasks[index];
		task.completed = !task.completed;
		this.save();
	}
}