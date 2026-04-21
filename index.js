class Cat {
    say() {
        return 'meow';
    }
}

class Dog {
    say() {
        return 'woof';
    }
}

class Bird {
    say() {
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
        sounds.push(animal.say());
    });

    return sounds;
}
