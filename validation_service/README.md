# NewsML Validation Service
Service validates NewsML format used by the Writer (Infomaker Scandinavia) and is written as a http rest application.

_NOTE: AS-IS, the validation service only supports NewsItems (text and picture)._

## Installation
1. Clone `https://github.com/Infomaker/writer-format`
2. In directory `validation_service` run `npm install`
3. To start the web server, run `node .`. Web server listens to port `8082`, e.g.

## Usage
### Validate NewsML message using HTTP REST API
Post your NewsML message to endpoint validation/newsitem, e.g.

```
curl -X POST --header "Content-Type:application/xml" --data @newsitem-text.xml http://127.0.0.1:8082/validation/newsitem
```

### Validate files in local directory
To validate NewsML files in a local directory you can execute node file `directory_validator.js`
supplying the path to the directory as an argument. E.g.

```
node /path/to/directory_validator.js directory=/path/to/directory/with/files
```
