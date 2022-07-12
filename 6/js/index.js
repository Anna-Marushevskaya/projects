const one = 1;

function visitLink(path) {
	localStorage.setItem(path, Number(localStorage.getItem(path)) + one);
}

function viewResults() {
	let divContent = document.getElementById('content');
	divContent.innerHTML += `
	<ul>
	<li> You visited Page1 `+ localStorage.getItem('Page1') + ` time(s) </li>
	<li> You visited Page2 `+ localStorage.getItem('Page2') + ` time(s) </li>
	<li> You visited Page3 `+ localStorage.getItem('Page3') + ` time(s) </li>
	</ul>
	`;
	localStorage.clear();
}