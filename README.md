# koa2-restful
A restful koa2 api stater.

## Reference
https://www.jianshu.com/p/c37a13506753

or `./info.txt` for backup

## Test
```bash
npm test
```

## Run
test for dev
```bash
npm run start:dev
```

for prod
```bash
npm start
```

## To do
1. [x] auto routing with version
2. [x] nested routing
3. [ ] sample method for all http method
4. [ ] sample unit test of each method
5. [ ] sample data model of mysql/mongo using ORM/ODM or further encapsulated lib
6. [ ] sample unit test of model
7. [ ] add oauth2 with redis ttl for token/refresh token
8. [ ] auto gen api doc with interactive test(swagger? apidoc?)
9. [x] body parser, logger
10. [ ] add sault and encrypt for password like sensitive information (bcrypt?)
11. [ ] limit access rate of same IP
12. [ ] CORS
13. [ ] cmd installer like yeoman
14. [ ] all requirements of `./info.txt`
15. [ ] Use `Accept-Language` and `Content-Language` header for deciding what language of contents get method return
16. [ ] handle file upload
17. [ ] setup `pm2.config.json` for pm2
18. [ ] a stub db
...

## Naming
1. use Snake case for folder and http method for filename.
2. use `_${folder_name}.spec.js` for unit test
3. `__${variable_name}` for global variable
...

## Notes
For each method, export an array of koa middleware. If body parser is needed, append `koaBody()` before the middleware, ref: `./app/v0/demo/get.js`.