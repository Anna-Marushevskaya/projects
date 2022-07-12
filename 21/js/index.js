function insertCharacter(char) {
	let currentValue = $('.inputDisplay').val();
	let length = currentValue.length;
	let flag = false;
	if (char === '+' || char === '-' || char === '*' || char === '/') {
		flag = true;
	}
	if (length === 0) {
		if (flag) {
			return;
		}
	}
	let flagNew = false;
	let lastCharacter = currentValue[length - 1];
	if (lastCharacter === '+' || lastCharacter === '-' || lastCharacter === '*' || lastCharacter === '/') {
		flagNew = true;
	}
	if (flag && flagNew) {
		$('.inputDisplay').val(currentValue.substring(0, length - 1) + char);
	} else {
		$('.inputDisplay').val($('.inputDisplay').val() + char);
	}
}

function clearInput() {
	$('.inputDisplay').val('');
}

let getEqual = (param) => {
	return new Function('', `return (${param})`)()
}

function result() {
	let currentValue = $('.inputDisplay').val();
	let length = currentValue.length;
	let flag = false;
	let char = currentValue[length - 1];
	if (char === '+' || char === '-' || char === '*' || char === '/') {
		flag = true;
	}
	if (flag) {
		$('.inputDisplay').val('ERROR!');
	} else {
		let result = getEqual($('.inputDisplay').val());
		if (result === Infinity) {
			$('.inputDisplay').val('ERROR!');
		} else {
			$('.inputDisplay').val(result);
			let strResult = currentValue + '=' + result;
			$('.log').prepend(`<div class="log-line"><span class="checkbox-button"></span><div class="result">`
			+ strResult + `</div><span class="sign">𐄂</span></div>`);
			if (strResult.includes('48')) {
				$('.log').children().first().find('div').css('text-decoration', 'underline');
			}
		}
	}
}

$(document).on('click', '.checkbox-button', function () {
	$(this).toggleClass('checkbox-button-hover');
});

$(document).on('click', '.sign', function () {
	$(this).parent().remove();
});