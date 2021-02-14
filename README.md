# GingkoBioworks
This project was created by Angela Wilson for Gingko Bioworks.  This web page allows you to view DNA sequence data.  DNA sequence data can be added to the table through manual entry or by file upload.  File upload must be of type JSON and schema structure MUST follow schema below: 

```{
  "sequences": [
    {
      "sequenceDescription": "test description",
      "sequenceName": "test",
      "sequence": "TTTTTTTTTTTTTTTTTT"
    },
    {
      "sequenceDescription": "Cloning vector pSport2, complete sequence",
      "sequenceName": "U12391.1",
      "sequence": "AAAAAAAAAAAAAAA"
    },
    {
      "sequenceDescription": "another test",
      "sequenceName": "test number 2",
      "sequence": "GGGGG"
    },
    {
      "sequenceDescription": "test number 3",
      "sequenceName": "hey",
      "sequence": "CCCCC"
    }
  ]
}

In the event that your JSON file does not follow this schema, please delete the uploaded file from your Local Storage on your browser (under "uploadedSequences") and try again.  Table data can also be downloaded in CSV format.  

Any bug reports or feature suggestions, please reach out to angelaw1233@gmail.com


This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
