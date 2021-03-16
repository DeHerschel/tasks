import Alert from "./Alert.js";
export default class AddTask {
	constructor() {
		this.addbtn = document.getElementById('add');
		this.title = document.getElementById('title');
		this.description = document.getElementById('description');
        this.alert = new Alert('alert')
	}
	onclick(callback) {
		this.addbtn.onclick = () => {
			if (title.value === '' || description.value === '') {
				//alert.classList.remove('d-none');
				//alert.innerText = "Title and description are required";
				this.alert.show("Title and description are requiredl")
			} else {
                this.alert.hide();
				callback(this.title.value, this.description.value);
			}
		}
	}
}