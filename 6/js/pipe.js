function isFunction(functionToCheck) {
	return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
 }

const pipe = (value, ...funcs) => {
	let i = 0;
	while (i < funcs.length) {
		if (isFunction(funcs[i])) {
			value = funcs[i](value);
			i++;
		} else {
			throw new RangeError('Provided argument at position ' + i + ' is not a function!');
		}
	}
	return value;
};

const replaceUnderscoreWithSpace = (value) => value.replace(/_/g, ' ');
const capitalize = (value) =>
	value
	.split(' ')
	.map((val) => val.charAt(0).toUpperCase() + val.slice(1))
	.join(' ');
const appendGreeting = (value) => `Hello, ${value}!`;

try {
	const result = pipe('john_doe', replaceUnderscoreWithSpace, capitalize, appendGreeting);
	alert(result);
} catch (e) {
	alert(e);
}