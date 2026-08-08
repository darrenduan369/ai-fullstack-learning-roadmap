const name: string = "Darren";

const age: number = 118;

function sayHello(user: string): string {
    return `Hello ${user}`;
}


console.log(sayHello(name));
console.log(`Age: ${age}`);

export {};