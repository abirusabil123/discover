# Tools

## Get the latest status of the backed

Run the following command in terminal.
```
discover/tools$ node dump-websites.js
```

## Manually approve submitted links regularly
When recreating the database change the following value.
```
"reviewStatus": 0
```
to
```
"reviewStatus": 1
```

## Mark errors as resolved
Run the following curl command.
```
curl -X PUT http://localhost:8090/errors/<error id>/resolve
```
Or run in backend folder.
```
docker exec -it backend-db-1 mysql -u root -ppassword mydatabase -e "UPDATE errors SET resolved = 1, resolved_at = NOW() WHERE resolved = 0;"
```

## Update static links
The static links to update are
```  
Local backend: backend/db/init.sql  
Tools: tools/static-links.js  
Link: config.js  
Android app: androidApp/app/src/main/java/com/example/discover/data/StaticLinks.kt  
```

To update all the static links automatically, run
```
cd tools  
node recreate-static-links.js  
```
