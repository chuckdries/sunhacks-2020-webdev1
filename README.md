# Web Development Up and Running

https://www.youtube.com/watch?v=LkUH3FKA4r8

In this talk, I go over creating a working web application from scratch with node and express. In the first hour, we get an anonymous message board. In the next two hours, we add a database to store the messages, and we add a user registration and login system to keep track of who sent the messages.

The first hour or so is basics and the initial message board, then in the remaining 2 hours we go over databases and implement a user authentication system. The auth system branch also refactors how we're importing code, and adds an npm command that reloads the code automatically as you change it.

The 'main' branch is the result of the first hour of coding. The 'databases' branch has the code to look up the messages from a database instead of an array. Check out the 'user-authentication' branch for the login system we finished at the end.

## Running

1. use `npm` to install dependencies

```
npm install
```

2. run the start command. Either `node index.js`, or, if you're on the user-authentication branch, `npm start`.

## Developing

If you're on main or databases, you'll need to stop node and start it again when you change your code. If you're on the user-authentication branch, it'll reload for you.

If you need to change the database shape, either stop the code and delete the data.db file, or you can force it to re-run the 'initial' migration by updating the db.migrate call to `db.migrate({force: true})`
