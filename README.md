## Tech Used

[Node.js](https://nodejs.org/en/)
[Express](https://expressjs.com/)

## Installation

Move to server directory with: cd server/

Create a .env file in server/ root and add variables

```
PGUSER=_your username_
PGHOST=localhost
PGDATABASE=chatter_db
PGPASSWORD=_your password_
```

Install Dependencies

```
npm i
```

Create DB

```
createdb -U <your username> chatter_db
```

Run NPM Script

```
npm run db:create
```
