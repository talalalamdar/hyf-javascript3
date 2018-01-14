
var space = function () {
    console.log("");                                            // a program to make spaces in the console
    console.log("=======================================");
    console.log("");
}
space();
class Movie {
    constructor(title, stars = [], writer = [], director = [], rates = []) {
        this.title = title;
        this.stars = stars
        this.writer = writer;
        this.director = director;
        this.rates = rates;
    }
    addStars(name) {
        this.stars.push(name);
    }
    addWriter(writer) {
        this.writer.push(writer);
    }
    addDirector(director) {
        this.director.push(director);
    }
    addRate(num) {
        if (typeof num !== "number") {
            throw new Error("The rate should be a number")
        } else {
            this.rates.push(num);
        }
    }
    getTitle() {
        return this.title;
    }
    getStars() {
        return  this.stars;
    }
    getWriter() {
        return this.writer;
    }
    getDirector() {
        return this.director;
    }
    getRating() {
        let average = 0
        this.rates.forEach(x => average += x);
        let result = average / this.rates.length;
        return `The average rating: ${result.toFixed(1)}`;
    }
}

class Staff {
    constructor(name, role, birth) {
        this.name = name;
        this.role = role;
        this.birth = new Date(birth);
        this.movies = [];
    }
    getName() {
        return this.name;
    }
    getRole() {
        return this.role;
    }
    get getAge() {
        let currentYear = new Date().getFullYear();
        return `Age: ${currentYear - this.birth.getFullYear()}`;
    }
    addMovie(movieName) {
        this.movies.push(movieName)
    }
}


// adding some staff

let nolan = new Staff("Christopher Nolan", "director", "1970-5-25");
let hedger = new Staff("Heath Ledger", "actor", "1985-7-3");
let bale = new Staff("Christian Bale", "actor", "1979-11-30");
let Jonathan = new Staff("Jonathan Nolan", "writer", "1982-6-13");
let freeman = new Staff("Morgan Freeman", "actor", "1960-2-18");
nolan.addMovie("The Dark Knight")
hedger.addMovie("The Dark Knight")
bale.addMovie("The Dark Knight")
Jonathan.addMovie("The Dark Knight")
freeman.addMovie("The Dark Knight")

// adding information for a movie
let the_dark_knight = new Movie("The Dark Knight");
the_dark_knight.addStars(hedger);
the_dark_knight.addStars(bale);
the_dark_knight.addStars(freeman);
the_dark_knight.addWriter(Jonathan);
the_dark_knight.addDirector(nolan);
the_dark_knight.addRate(9.0);
the_dark_knight.addRate(6.5);
the_dark_knight.addRate(8.0);
the_dark_knight.addRate(2.8);
the_dark_knight.addRate(10)


// checking the methods 

console.log(the_dark_knight.stars);
space();
console.log(the_dark_knight.getTitle())
console.log(the_dark_knight.getRating());
console.log(the_dark_knight.getWriter());
console.log(the_dark_knight.getDirector());
space();

// checking the Staff methods 
console.log(nolan.getName());
console.log(nolan.getRole());
console.log(nolan.getAge);
space();


// checking the requests

console.log(the_dark_knight.getStars().map(actor => `${actor.getName()} ${actor.getAge}`))
const director = the_dark_knight.getDirector();
console.log(`Director: ${director.map(dir => `${dir.getName()}`)}`);


