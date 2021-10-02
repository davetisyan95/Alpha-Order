# Alpha Order

---

### What does this do?
Provides a script that attempts to determine the order of an any alphabet given a list of words in alphabetical order.   

---

### Setup
1) `yarn install`
2) `yarn test`
3) `yarn run alphabetize ./sample-words`

---

### Use A Custom File
The current version only supports sample files in .js format.   
For Example...   
`./your-sample-words.js`
```javascript
const sampleWords = [
    "acbc",
    "bcc",
    "bcb",
    "ba",
    ...
]
module.exports = sampleWords
```
You can provide the file as an arguement to the `alphabetize` script like so....   
`yarn run alphabetize ./your-sample-words`   

The output will be printed out to the console.
```shell
yarn run alphabetize ./your-sample-words
Alphabetizing: ./your-sample-words
Alphabetical Order:  [ 'c', 'a', 'b' ]
```

---
### Test Coverage
Tests are written using Jest.   

#### How To Run Tests
```shell
yarn test
```
This will also generate a test coverage report in `./reports`
#### View Test Coverage Report
You can view the test coverage report by opening `reports/lcov-report/index.html` in your browser
```shell
open -a "Google Chrome" reports/lcov-report/index.html
```
```shell
open -a "Safari" reports/lcov-report/index.html
```