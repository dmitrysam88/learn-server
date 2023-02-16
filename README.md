# Learn server

It is a test server for developers to learn how to send http request and get result.

To run server you just need to clone net and run in terminal `npm start`.

It will run server on port `3000` and with `myDataBase.json` file as data base.

But you can configured port and data base file.

- port can be configured by one of word `-p` `-port` `p` `port`
- data can be configured by one of word `-db` `-database` `db` `database`

Examples:
- `npm start` - port 3000, database myDataBase.json
- `npm start -- -port 4000 -database myDB.json`
- `npm start -- -p 4000 -db myDB.json`
