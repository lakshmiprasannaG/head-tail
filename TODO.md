# TAIL

* **TODO**

* **Done**

  - [x] Take input from command line for tail.
  - [x] Make tail to give last n bytes(-c).
  - [x] Make tail to give last n lines (-n).
  - [x] Implement tail that gives single line.
  - [x] Implement tail that gives multiple lines.

# HEAD

* **TODO**
  - [ ] Add tests for functions: 
    - [x] firstNLines
    - [x] firstNBytes
    - [ ] readFile
  - [ ] Send output in two different streams
    - [ ] Standard output stream.
    - [ ] Standard error stream.


* **Consider**
  - [ ] Problems with parseArgs
    - [ ] It's complex
    - [ ] Unable to test functions (segregateArgs, resetArgs) in parseArgs, breaking of functions may be in wrong place.
    - [ ] Try modifying the idea.


* **Done**
  - [x] Implement all the errors of readFile.
  - [x] Remove duplicate tests.
  - [x] When multiple files are passed, if any file is not present, that should throw error, and other files should get executed normally.
  - [x] Modify the return structure of parseArgs.
  - [x] Override options, when same option is passed multiple times.
  - [X] Move parse time errors(option and count related errors) to parseArgs.
  - [x] Refactor parseArgs.
  - [x] Give scalable logic in asssertValidInput.
  - [x] Refactor 'headMain' function in headLib.js.
  - [x] Refactor head function in 'headLib.js'.
  - [ ] ~~After doing 'head', does last line has '\n' as last character?~~
  - [x] Check the functionality of head once.
  - [x] Consider rich structure for 'head'.
  - [x] Write validations for options.
    - [x] Count should be positive.
    - [x] Either '-n' or '-c', only single option can be given.
    - [x] Test validations.
  - [x] Extract each error into its own function in assertValidInput.
  - [x] Modify the input data structure of formatFileContent- from objects to array of objects.
  - [x] Modify the input data structure of formatFileContent- from arrays to objects.
  - [x] Give the responsibility of decision making to head, about which data to send back based on option.
  - [x] Test validateInput.
  - [x] Add few cases in parseArgs where
    - [x] count is concatinated with option.
    - [x] option and count are passed as -count.
  - [x] Move validation from parseArgs to headLib.
  - [x] Format the output when multiple files are passed as input.
  - [x] Move 'headMain' tests to different file.
  - [x] Wire parseArgs to headLib.js
    - [x] Modify the contract of head.
  - [X] Implement parseArgs.
    - [x] When only one file is passed.
    - [x] When only one option with any number of files is passed.
    - [X] When no option is provided with multiple files.
    - [ ] ~~Files can be [^-*0-9]~~
  - [x] Consider 'head', when no options are passed.
  - [x] Implement '-c' option.
  - [x] Implement '-n' option.
  - [x] Take options as object.
  - [x] Create main in 'headLib.js'.
  - [x] Write main.
  - [x] Take file from command line.
  - [ ] ~~Create a data file.~~
  - [x] Extract split and join into different functions.
  - [x] Take a constant variable for '\n'.
  - [x] Work on content, don't consider file.
  - [x] Implement 'head' that gives first 10 lines of the content. (default behaviour of head).
  - [x] If the content is less than or equal to 10 lines, should display whole content.
  - [x] Create 'src' and 'test' directories.
  - [ ] ~~Copy eslint.json.~~
  - [x] Check whether mocha is present.
  - [x] Create 'testHead.js'.
  - [x] Write a test case.
  - [x] Implement 'head file'.
  - [x] After passing the first test case, create 'head.js' and move the logic there.
