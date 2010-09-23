// ==========================================================================
// Project:   Voting
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Voting */

// This is the function that will start your app running.  The default
// implementation will load any fixtures you have created then instantiate
// your controllers and awake the elements on your page.
//
// As you develop your application you will probably want to override this.
// See comments for some pointers on what to do next.
//
Voting.main = function main() {

  Voting.getPath('mainPage.mainPane').append() ;

  var students = Voting.store.find(Voting.STUDENTS_QUERY) ;
  Voting.studentsController.set('content', students) ;

  // couldn't figure out how to put this in a sensible namespace. I suck at javascript.
  Voting.fullRefresh = function() {
    Voting.store.refreshQuery(Voting.STUDENTS_QUERY) ;
  };

  // Basically pulls down the whole list every 30 seconds.
  // this is non-ideal, but ehh. It's a practice app.
  // TODO: investigate how to do this better.
  // some way to push changes from rails -> SC would be wicked.
  var timer = SC.Timer.schedule({
    target: this, action: 'fullRefresh', interval: 30000, repeats: true
  });

} ;

function main() { Voting.main(); }
