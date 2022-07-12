const one = 1;
const two = 2;
const three = 3;
const five = 5;
const six = 6;
const fifteen = 15;
const twenty = 20;
const fourty = 40;
const threeThousand = 3000;

let cell = document.getElementsByTagName('td');
for (let i = 0; i < cell.length; i++) {
    cell[i].onclick = function () {

        if (i === 0 || i === three || i === six) {
            if (cell[i].style.background !== 'yellow') {
                cell[i].style.background = 'blue';
            }
            if (cell[i + one].style.background !== 'yellow') {
                cell[i + one].style.background = 'blue';
            }
            if (cell[i + two].style.background !== 'yellow') {
                cell[i + two].style.background = 'blue';
            }
        } else if (i === five) {
            for (let j = 0; j < cell.length; j++) {
                if (cell[j].style.background !== 'blue' && cell[j].style.background !== 'yellow') {
                    cell[j].style.background = 'green';
                    document.getElementsByTagName('table')[0].style.background = 'green';
                }
            }
        } else {
            cell[i].style.background = 'yellow';
        }
    }
}
/* END TASK 1 */

function validPhone() {
    let task2 = document.getElementById('task2');
    let condition = /^\+380\d{3}\d{2}\d{2}\d{2}$/;
    let tell = document.getElementById('tell').value;
    let messageNo = document.createElement('div');
    messageNo.id = 'messageNo';
    if (document.getElementById('messageNo')) {
        task2.removeChild(document.getElementById('messageNo'));
    }
    if (condition.test(tell)) {
        document.getElementById('send').disabled = false;
        document.getElementById('tell').style.borderColor = '#000';
    } else {
        document.getElementById('tell').style.borderColor = '#e40101';
        messageNo.innerHTML = 'Type number does not follow format +380*********';
        task2.prepend(messageNo);
        document.getElementById('send').disabled = true;
        if (document.getElementById('messageOk')) {
            task2.removeChild(document.getElementById('messageOk'));
        }
    }
}

function sendMessage() {
    document.getElementById('tell').style.borderColor = '#1fac02';
    let messageOk = document.createElement('div');
    messageOk.id = 'messageOk';
    messageOk.innerHTML = 'Data was successfully sent';
    let task2 = document.getElementById('task2');
    task2.prepend(messageOk);
}
/* END TASK 2 */

const zoneA = {
    top: 175,
    left: 55
}
const zoneB = {
    top: 175,
    left: 575
}
document.getElementById('court').onclick = function clickEvent(e) {
    let ball = document.getElementById('ball');
    let rect = e.target.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;
    ball.style.top = y - twenty + 'px';
    ball.style.left = x - twenty + 'px';

    if (x <= zoneA.left + fifteen && x >= zoneA.left - fourty &&
        y >= zoneA.top - fourty && y <= zoneA.top + fifteen) {
        let teamBScore = document.createElement('div');
        teamBScore.className = 'teamScore';
        teamBScore.innerHTML = 'Team B score!';
        document.getElementById('task3').appendChild(teamBScore);
        document.getElementById('teamBscore').innerHTML = Number(document.getElementById('teamBscore').innerHTML) + 1;
        setTimeout(function () {
            document.getElementById('task3').removeChild(teamBScore);
        }, threeThousand);
    }

    if (x <= zoneB.left + fifteen && x >= zoneB.left - fourty &&
        y >= zoneB.top - fourty && y <= zoneB.top + fifteen) {
        let teamBScore = document.createElement('div');
        teamBScore.className = 'teamScore';
        teamBScore.innerHTML = 'Team A score!';
        document.getElementById('task3').appendChild(teamBScore);
        document.getElementById('teamAscore').innerHTML = Number(document.getElementById('teamAscore').innerHTML) + 1;
        setTimeout(function () {
            document.getElementById('task3').removeChild(teamBScore);
        }, threeThousand);
    }
}
/* END TASK 3 */