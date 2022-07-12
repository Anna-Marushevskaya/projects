'use strict';

const two = 2;
const minusTwo = -2;
const minusOne = -1;

class PizzaException {
    constructor(errorMessage) {
        this.log = errorMessage;
    }
}

class Pizza {
    constructor(...args) {
        if (args.length !== two) {
            throw new PizzaException(`Required two arguments, given: ${args.length}`);
        }
        if (!Pizza.allowedSizes.includes(args[0])) {
            throw new PizzaException('Invalid type');
        }
        this.size = args[0];
        if (!Pizza.allowedTypes.includes(args[1])) {
            throw new PizzaException('Invalid type');
        }
        this.type = args[1];
        this.extraIngredient = [];
    }

    getSize() {
            return this.size;
}

    getPrice() {
        let price = this.size.price + this.type.price;
        for (let i = 0; i < this.extraIngredient.length; i++) {
            price += this.extraIngredient[i].price;
        }
        return price;
    }

    getPizzaInfo() {
        let size = 0;
        let type = 0;
        let extraIngredient = [];
        if (this.size === Pizza.SIZE_S) {
            size = Pizza.SIZE_S.name;
        } else if (this.size === Pizza.SIZE_M) {
            size = Pizza.SIZE_M.name;
        } else if (this.size === Pizza.SIZE_L) {
            size = Pizza.SIZE_L.name;
        }

        if (this.type === Pizza.TYPE_VEGGIE) {
            type = Pizza.TYPE_VEGGIE.name;
        } else if (this.type === Pizza.TYPE_MARGHERITA) {
            type = Pizza.TYPE_MARGHERITA.name;
        } else if (this.type === Pizza.TYPE_PEPPERONI) {
            type = Pizza.TYPE_PEPPERONI.name;
        }

        for (let i = 0; i < this.extraIngredient.length; i++) {
            if (this.extraIngredient[i] === Pizza.EXTRA_TOMATOES) {
                extraIngredient.push(Pizza.EXTRA_TOMATOES.name);
            } else if (this.extraIngredient[i] === Pizza.EXTRA_CHEESE) {
                extraIngredient.push(Pizza.EXTRA_CHEESE.name);
            } else if (Pizza.EXTRA_MEAT) {
                extraIngredient.push(Pizza.EXTRA_MEAT.name);
            }
        }

        let info = `Size: ${size}, type: ${type};`;
        if (extraIngredient.length > 0) {
            info += ` extra ingredients: `;
            for (let i = 0; i < extraIngredient.length; i++) {
                info += `${extraIngredient[i]}, `;
            }
            info = info.slice(0, minusTwo);
        }
        info += `; price: ${this.getPrice()} UAH.`;
        return info;
    }

    addExtraIngredient(...ingredient) {
        if (ingredient.length > 1) {
            throw new PizzaException('Invalid type');
        }
        if (this.extraIngredient.includes(ingredient[0])) {
            throw new PizzaException('Duplicate ingredient');
        }
        if (Pizza.allowedExtraIngredients.includes(ingredient[0])) {
            this.extraIngredient.push(ingredient[0]);
        } else {
            throw new PizzaException('Invalid ingredient');
        }

    }

    removeExtraIngredient(...ingredient) {
        if (ingredient.length > 1) {
            throw new PizzaException('Invalid type');
        }
        if (Pizza.allowedExtraIngredients.includes(ingredient[0])) {
            const index = this.extraIngredient.indexOf(ingredient[0]);
            if (index > minusOne) {
                this.extraIngredient.splice(index, 1);
            } else {
                throw new PizzaException('Ingredient does not added');
            }
        } else {
            throw new PizzaException('Invalid ingredient');
        }
    }

    getExtraIngredients() {
        return this.extraIngredient;
    }
}

Pizza.SIZE_S = {name: 'SMALL', price: 50}
Pizza.SIZE_M = {name: 'MEDIUM', price: 75}
Pizza.SIZE_L = {name: 'LARGE', price: 100}

Pizza.TYPE_VEGGIE = {name: 'VEGGIE', price: 50}
Pizza.TYPE_MARGHERITA = {name: 'MARGHERITA', price: 60}
Pizza.TYPE_PEPPERONI = {name: 'PEPPERONI', price: 70}

Pizza.EXTRA_TOMATOES = {name: 'TOMATOES', price: 5}
Pizza.EXTRA_CHEESE = {name: 'CHEESE', price: 7}
Pizza.EXTRA_MEAT = {name: 'MEAT', price: 9}

Pizza.allowedSizes = [Pizza.SIZE_S, Pizza.SIZE_M, Pizza.SIZE_L];
Pizza.allowedTypes = [Pizza.TYPE_VEGGIE, Pizza.TYPE_MARGHERITA, Pizza.TYPE_PEPPERONI];
Pizza.allowedExtraIngredients = [Pizza.EXTRA_TOMATOES, Pizza.EXTRA_CHEESE, Pizza.EXTRA_MEAT];

let pizza = new Pizza(Pizza.SIZE_S, Pizza.TYPE_VEGGIE);
console.log(`Price: ${pizza.getPrice()} UAH`);
pizza.addExtraIngredient(Pizza.EXTRA_MEAT);
console.log(`Price: ${pizza.getPrice()} UAH`);
pizza.addExtraIngredient(Pizza.EXTRA_CHEESE);
pizza.addExtraIngredient(Pizza.EXTRA_TOMATOES);
console.log(`Price with extra ingredients: ${pizza.getPrice()} UAH`);
console.log(`Is pizza large: ${pizza.getSize() === Pizza.SIZE_L}`);
pizza.removeExtraIngredient(Pizza.EXTRA_CHEESE);
console.log(`Price with extra ingredients: ${pizza.getPrice()} UAH`);
console.log(`Extra ingredients: ${pizza.getExtraIngredients().length}`);
console.log(pizza.getPizzaInfo());