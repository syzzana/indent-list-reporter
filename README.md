# indent-list-reporter

Playwright list reporter with colorful terminal and indentation

#### Purpose: 
 - I wanted to have a reporter that displays the tests in a hierarchical format with indentation and colorful terminal output,
and with that I could see right away the hierarchy of the tests without having to scroll horizontally and strain my eyes. 
 - Colors are configurable by passing [some options to the reporter](docs/GettingStarted.md). 
 - From the colors we can distinguish the different test states (passed, failed, skipped, etc), 
and also by the indentation level, whether if the test is a suite or a test, and if the test is a retry or not.

#### Information:  
 Indent List Reporter is a reporter for Playwright that displays a list of tests in a hierarchical format with indentation.
 It is based on the [list reporter] but with a twist. It is a list reporter with indentation and colorful terminal output.
 It is build using the custom reporter API of Playwright.  
 Read more on how to set/build a custom reporter with Playwright [here](https://playwright.dev/docs/test-reporters/#custom-reporters).

## [Getting Started](docs/GettingStarted.md)

