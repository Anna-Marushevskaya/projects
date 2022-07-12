let two = 2;
let four = 4;

//task1
//const arr = ['1', '2', '3', '4', '5'];
function getMaxEvenELement(arr) {
    let evenArr = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] % two === 0) {
            evenArr.push(arr[i]);
        }
    }
    return Math.max.apply(null, evenArr);
}

//task2
let a = 3;
let b = 5;
[a, b] = [b, a];

//task3
function getValue(e) {
    return e ?? '-';
}

//task4
/*const arrayOfArrays = [
    ['name', 'dan'],
    ['age', '21'],
    ['city', 'Lviv']
];*/
function getObjFromArray(arrayOfArrays) {
    let object = {};
    for (let prop in arrayOfArrays) {
        if (Object.prototype.hasOwnProperty.call(arrayOfArrays, prop)) {
            object[arrayOfArrays[prop][0]] = arrayOfArrays[prop][1];
        }
    }
    return object;
}

//task5
//const obj1 = {name: 'nick'};
function addUniqueId(objOrigin) {
    let obj = Object.assign({}, objOrigin);
    obj['id'] = Symbol();
    return obj;
}

//task6
/*const oldObj = {
    name: 'willow',
    details: {id: 1, age: 47, university: 'LNU'}
};*/
function getRegroupedObject(oldObj) {
    let newObj = {university: '', user: {}};
    [newObj.university, newObj.user.age, newObj.user.firsName, newObj.user.id] =
    [oldObj.details.university, oldObj.details.age, oldObj.name, oldObj.details.id];
    return newObj;
}

//task7 
//let arr = [2, 3, 4, 2, 4, 'a', 'c', 'a'];
function getArrayWithUniqueElements(arr) {
    let unique = [...new Set(arr)];
    return unique;
}

//task8
//const phoneNumber = '0123456789';
function hideNumber(phoneNumber) {
    let mask = phoneNumber.slice(-four).padStart(phoneNumber.length, '*')
    return mask;
}

//task9
function add(a, b = required()) {
        return a + b;
}
function required() {
    throw new Error('b is required');
}

//task10
function* generateIterableSequence() {
  yield 'I';
  yield 'love';
  yield 'EPAM';
}
/*const generatorObject = generateIterableSequence();
for (let value of generatorObject) {
    console.log(value);
}*/