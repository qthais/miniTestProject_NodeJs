// init-mongo.js
db = db.getSiblingDB('mydatabase'); // Replace with your database name

db.createCollection('users');
db.users.insertMany([
  { name: "John Doe", email: "john@example.com", age: 30 },
  { name: "Jane Smith", email: "jane@example.com", age: 25 },
  { name: "Alice Johnson", email: "alice@example.com", age: 28 }
]);
