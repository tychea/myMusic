let userName = '';
let age = '';
console.log(userName, age);

function login(name, age, callback) {
  setTimeout(() => {
    return callback(name, age);
  }, 1000);
}
function setUser(n, a) {
  userName = n;
  age = a;
  console.log(userName, age);
}
login('steven', 20, (n, a) => {
  console.log(n, a);
});
