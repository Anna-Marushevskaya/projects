let five = 5;
let minusOne = -1;
let minute = 60000;
let types = ['sport', 'info', 'politics', 'general', 'manager'];

class ReadyForPushNotification {

    constructor(magazine) {
        this.magazine = magazine;
    }

    go() {
        if (this.magazine.articles.length >= five) {
            this.magazine.change(new ReadyForApprove(this.magazine));
        }
    }
}

class ReadyForApprove {

    constructor(magazine) {
        this.magazine = magazine;
    }

    go() {
        if (this.magazine.approved) {
            this.magazine.change(new ReadyForPublish(this.magazine));
        }
    }
}

class ReadyForPublish {

    constructor(magazine) {
        this.magazine = magazine;
    }

    go() {
        if (this.magazine.published) {
            this.magazine.change(new PublishInProgress(this.magazine));
        }
    }
}

class PublishInProgress {

    constructor(magazine) {
        this.magazine = magazine;
    }

    go() {
        this.magazine.notify();
        setTimeout(() => {
            this.magazine.change(new ReadyForPushNotification(this.magazine))
        }, minute);
    }
}

class Magazine {

    constructor() {
        this.articles = [];
        this.followers = [];
        this.staff = [];
        this.currentState = new ReadyForPushNotification(this);
        this.currentState.go();
        this.approved = false;
        this.published = false;
    }

    change(state) {
        this.currentState = state;
        this.currentState.go();
    }

    addArticle(type, article) {
        this.articles.push({'type': type, 'article':article});
        this.currentState.go();
    }

    addEmployee(employee) {
        this.staff.push(employee);
    }

    subscribe(follower, type) {
        this.followers.push({'follower': follower, 'type': type});
    }

    unsubscribe(follower, type) {
        for(let i = 0; i < this.followers.length; i++) {
            if (this.followers[i]['follower'] === follower && this.followers[i]['type'] === type) {
                this.followers.splice(i, 1);
            }
        }
    }

    notify() {
        for(let i = 0; i < this.followers.length; i++) {
            for(let j = 0; j < this.articles.length; j++) {
                if (this.followers[i]['type'] === this.articles[j]['type']) {
                    this.followers[i]['follower'].onUpdate(this.articles[j]['article']);
                }
            }
        }

        this.articles = [];
        this.approved = false;
        this.published = false;
    }
}

class MagazineEmployee {

    constructor(name, type, magazine) {
        this.name = name;
        if (types.indexOf(type) > minusOne) {
            this.type = type;
        }
        this.magazine = magazine;
        magazine.addEmployee(this);
    }

    approve() {
        if (this.type === 'manager') {
            if (this.magazine.currentState instanceof ReadyForApprove) {
                console.log(`Hello ${this.name}. You've approved the changes`);
                this.magazine.approved = true;
                this.magazine.currentState.go();
            } else if(this.magazine.currentState instanceof ReadyForPushNotification) {
                console.log(`Hello ${this.name}.  You can't approve. We don't have enough of publications`);
            } else if(this.magazine.currentState instanceof ReadyForPublish) {
                console.log(`Hello ${this.name}.  Publications have been already approved by you`);
            } else {
                console.log(`Hello ${this.name}.  While we are publishing we can't do any actions`);
            }
        } else {
            console.log('you do not have permissions to do it');
        }
    }

    addArticle(article) {
        if (this.type !== 'manager') {
            this.magazine.addArticle(this.type, article);
        }
    }

    publish() {
        if (this.magazine.currentState instanceof ReadyForPublish) {
            console.log(`Hello ${this.name}. You've recently published publications`);
            this.magazine.published = true;
            this.magazine.currentState.go();
        } else if(this.magazine.currentState instanceof ReadyForPushNotification) {
            console.log(`Hello ${this.name}.  You can't publish. We are creating publications now`);
        } else if(this.magazine.currentState instanceof ReadyForApprove) {
            console.log(`Hello ${this.name}.  You can't publish. We don't have a manager's approval`);
        } else {
            console.log(`Hello ${this.name}.  While we are publishing we can't do any actions`);
        }
    }
}

class Follower {

    constructor(name) {
        this.name = name;
    }

    subscribeTo(magazine, type) {
        magazine.subscribe(this, type);
    }

    unsubscribeFrom(magazine, type) {
        magazine.unsubscribe(this, type);
    }

    onUpdate(data) {
        console.log(data + ' ' + this.name);
    }
    
}