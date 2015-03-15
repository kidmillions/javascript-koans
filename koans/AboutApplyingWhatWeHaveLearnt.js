var _; //globals

describe("About Applying What We Have Learnt", function() {

  var products;

  beforeEach(function () { 
    products = [
       { name: "Sonoma", ingredients: ["artichoke", "sundried tomatoes", "mushrooms"], containsNuts: false },
       { name: "Pizza Primavera", ingredients: ["roma", "sundried tomatoes", "goats cheese", "rosemary"], containsNuts: false },
       { name: "South Of The Border", ingredients: ["black beans", "jalapenos", "mushrooms"], containsNuts: false },
       { name: "Blue Moon", ingredients: ["blue cheese", "garlic", "walnuts"], containsNuts: true },
       { name: "Taste Of Athens", ingredients: ["spinach", "kalamata olives", "sesame seeds"], containsNuts: true }
    ];
  });

  /*********************************************************************************/

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (imperative)", function () {

    var i,j,hasMushrooms, productsICanEat = [];

    for (i = 0; i < products.length; i+=1) {
        if (products[i].containsNuts === false) {
            hasMushrooms = false;
            for (j = 0; j < products[i].ingredients.length; j+=1) {
               if (products[i].ingredients[j] === "mushrooms") {
                  hasMushrooms = true;
               }
            }
            if (!hasMushrooms) productsICanEat.push(products[i]);
        }
    }

    expect(productsICanEat.length).toBe(1);
  });

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (functional)", function () {


      var isMushroom = function(x) { return x === "mushrooms" };


      var productsICanEat = _(products).filter(function(x){
          return (!_(x.ingredients).any(isMushroom) && !x.containsNuts);
      });

      /* solve using filter() & all() / any() */

      expect(productsICanEat.length).toBe(1);
  });

  /*********************************************************************************/

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (imperative)", function () {
    
    var sum = 0;
    for(var i=1; i<1000; i+=1) {
      if (i % 3 === 0 || i % 5 === 0) {
        sum += i;
      }
    }
    
    expect(sum).toBe(233168);
  });

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (functional)", function () {

    var sum = _.range(1000).reduce(function(sum, x) {
        if (x % 3 === 0 || x % 5 === 0) {
            return sum + x;
        } else {
            return sum;
        }
    });    /* try chaining range() and reduce() */

    expect(233168).toBe(sum);
  });

  /*********************************************************************************/
   it("should count the ingredient occurrence (imperative)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    for (i = 0; i < products.length; i+=1) {
        for (j = 0; j < products[i].ingredients.length; j+=1) {
            ingredientCount[products[i].ingredients[j]] = (ingredientCount[products[i].ingredients[j]] || 0) + 1;
        }
    }

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  it("should count the ingredient occurrence (functional)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    /* chain() together map(), flatten() and reduce() */

      function countIngredients(productList) {
          return _(productList).chain()
              .map(function(x) {
                  return x.ingredients;
              })
              .flatten()
              .reduce(function(memo, y) {
                  return ingredientCount[y] = (ingredientCount[y] || 0) + 1;
              })
              .value();
      }

      countIngredients(products);


    expect(ingredientCount['mushrooms']).toBe(2);
  });

  /*********************************************************************************/
  /* UNCOMMENT FOR EXTRA CREDIT */
  
  it("should find the largest prime factor of a composite number", function () {
  
    function isPrime(n) {
      if (n >= 1 && n <= 2) {
          return true;
      } else {
        var maxTestValue = Math.ceil(Math.sqrt(n));
          for (var i = 2; i <= maxTestValue; i++) {
            if (n % i === 0) {
              return false;
           }
          }
        return true;
      }
    }

    
    
    function findPrimeNumbers(n) {
      var primesArray = [];
      for (var i = n; i > 0; i--) {
        if (isPrime(i)) {
           primesArray.push(i);
        }
      }
      return primesArray;
    }

    function findGreatestPrimeFactor(n) {
      if (isPrime(n)) {
        return console.error("You entered a prime number.")
      }

      var testNumbers = findPrimeNumbers(n);

      for (var i = 0; i < testNumbers.length; i++) {
        if (n % testNumbers[i] === 0) {
          console.log(testNumbers[i]);
          return testNumbers[i];
        }
      }
    }


    expect(findGreatestPrimeFactor(18)).toBe(3);
   
    expect(findGreatestPrimeFactor(3)).toBe('console.error("You entered a prime number.")');

 });

  it("should find the largest palindrome made from the product of two 3 digit numbers", function () {
    function palindromeTest(n) {
      var digitArray = n.toString().split('');

      return _(digitArray).all(function(x) {
        return x === (digitArray[digitArray.length - digitArray.indexOf(x)]);
      })
    }

    function findGreatestPalindrome(a, b) {
      var i = a * b;
      for (i > 0; i--) {
        if (palindromeTest(i)) {
          break;
        }
      }
      return i;
    }

    expect(findGreatestPalindrome(122)).toBe(121);

  });

  it("should find the smallest number divisible by each of the numbers 1 to 20", function () {


    function findLCM() {
      var array = _.range(20);
      var i;
      for (i = 40; i < 10000; i++) {
        var testDivisors = _(array).all(function(x) {
          return i % x === 0;
        });
        if (testDivisors) {
          break;
        }
      }
      return i;
    });

    expect(findLCM()).toEqual(232792560); //I think.

  it("should find the difference between the sum of the squares and the square of the sums", function () {

    function findDifference(a, b) {
      var sumOfSquares = function(a, b) {
        return Math.sqrt(a) + Math.sqrt(b);
      }

      var squareOfSums = function(a, b) {
        return Math.sqrt(a + b);
      }

      return sumOfSquares(a, b) - squareOfSums(a, b);

    }
    
  });

  it("should find the 10001st prime", function () {

  });
  
});
