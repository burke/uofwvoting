// ==========================================================================
// Project:   Voting.Student Fixtures
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Voting */

sc_require('models/student');

Voting.Student.FIXTURES = [

  // TODO: Add your data fixtures here.
  // All fixture records must have a unique primary key (default 'guid').  See
  // the example below.

  { guid: 1,
    firstName: "Michael",
    lastName: "Scott",
    number: 1239852 },

  { guid: 2,
    firstName: "Dwight",
    lastName: "Schrute",
    number: 1205125},

  { guid: 3,
    firstName: "Jim",
    lastName: "Halpert",
    number: 1295812 },

  { guid: 4,
    firstName: "Pam",
    lastName: "Beesly",
    number: 2305891,
    votedAt: SC.DateTime.create() },

  { guid: 5,
    firstName: "Ryan",
    lastName: "Howard",
    number: 10285812 }

];
; if ((typeof SC !== 'undefined') && SC && SC.scriptDidLoad) SC.scriptDidLoad('voting');