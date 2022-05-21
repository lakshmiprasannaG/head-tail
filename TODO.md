**TODO**

- [ ] Wire parseArgs to headLib.js
  - [ ] Modify the contract of head.
- [ ] Consider rich structure for 'head'.
- [ ] Refactor head function in 'headLib.js'.
- [ ] Write validations for options.
  - [ ] Count should be positive.
  - [ ] Bytes should be positive.
  - [ ] Either '-n' or '-c', only single option can be given.
- [ ] After doing 'head', does last line has '\n' as last character?
- [ ] Check the functionality of head once.

**Done**

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

**Doubts**

- [ ] Do I really need to send 2 options at once? Anyway only 1 option can be taken
- [ ] Why to select delimiter based on options? Why not send it directly based on option?
  - [ ] But where to have option check to select delimiter? 
  - [ ] In the parsing function or in headMain?
  - [ ] Writing parse function may give the whole clarity.

