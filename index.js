class Cat {
    say() {
        return 'meow';
    }
}

class Dog {
    talk() {
        return 'woof';
    }
}

class Bird {
    sing() {
        return 'chirp';
    }
}

let animals = [
    new Cat(),
    new Dog(),
    new Bird()
]

function listen(animals) {
    let sounds = [];

    animals.forEach(animal => {
        if (animal instanceof Cat) {
            sounds.push(animal.say());
        } else if (animal instanceof Dog) {
            sounds.push(animal.talk());
        } else if (animal instanceof Bird) {
            sounds.push(animal.sing());
        }
    });

    return sounds;
}
