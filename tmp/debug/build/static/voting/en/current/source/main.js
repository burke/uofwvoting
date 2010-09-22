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

  // Step 1: Instantiate Your Views
  // The default code here will make the mainPane for your application visible
  // on screen.  If you app gets any level of complexity, you will probably
  // create multiple pages and panes.
  Voting.getPath('mainPage.mainPane').append() ;

  // Step 2. Set the content property on your primary controller.
  // This will make your app come alive!

  var query = SC.Query.local(Voting.Student) ;
  var students = Voting.store.find(query) ;
  Voting.studentsController.set('content', students) ;

  // TODO: Set the content property on your primary controller
  // ex: Voting.contactsController.set('content',Voting.contacts);

} ;

function main() { Voting.main(); }
; if ((typeof SC !== 'undefined') && SC && SC.scriptDidLoad) SC.scriptDidLoad('voting');