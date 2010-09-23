/* >>>>>>>>>> BEGIN bundle_info.js */
        ;(function() {
          var target_name = 'sproutcore/standard_theme' ;
          if (!SC.BUNDLE_INFO) throw "SC.BUNDLE_INFO is not defined!" ;
          if (SC.BUNDLE_INFO[target_name]) return ; 

          SC.BUNDLE_INFO[target_name] = {
            requires: ['sproutcore/empty_theme'],
            styles:   ['/static/sproutcore/standard_theme/es/8b65428a7dcfa2226586b487bde1bf11560de2aa/stylesheet-packed.css','/static/sproutcore/standard_theme/es/8b65428a7dcfa2226586b487bde1bf11560de2aa/stylesheet.css'],
            scripts:  ['/static/sproutcore/standard_theme/es/8b65428a7dcfa2226586b487bde1bf11560de2aa/javascript-packed.js']
          }
        })();

/* >>>>>>>>>> BEGIN source/core.js */
// ==========================================================================
// Project:   Voting
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Voting */

/** @namespace

  My cool new app.  Describe your application.

  @extends SC.Object
*/
Voting = SC.Application.create(
  /** @scope Voting.prototype */ {

  NAMESPACE: 'Voting',
  VERSION: '0.1.0',

  // This is your application store.  You will use this store to access all
  // of your model data.  You can also set a data source on this store to
  // connect to a backend server.  The default setup below connects the store
  // to any fixtures you define.
  store: SC.Store.create({
    commitRecordsAutomatically: YES
  }).from('Voting.StudentDataSource')

  // TODO: Add global constants or singleton objects needed by your app here.

}) ;

/* >>>>>>>>>> BEGIN source/controllers/search.js */
// ==========================================================================
// Project:   Voting.searchController
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Voting */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
Voting.searchController = SC.ObjectController.create(
/** @scope Voting.searchController.prototype */ {

  searchTerm: null,

  searchTermDidChange: function(target, key) {
    var regexp = new RegExp("^"+target.get(key), 'i');
    var condition = "firstName MATCHES({exp}) OR lastName MATCHES({exp}) OR number MATCHES({exp})";
    var params = { exp: regexp };
    var query = SC.Query.local(Voting.Student, condition, params);

    var students = Voting.store.find(query) ;
    Voting.studentsController.set('content', students) ;

  }.observes('searchTerm')

}) ;

/* >>>>>>>>>> BEGIN source/controllers/students.js */
// ==========================================================================
// Project:   Voting.studentsController
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Voting */

/** @class

  (Document Your Controller Here)

  @extends SC.ArrayController
*/
Voting.studentsController = SC.ArrayController.create(
/** @scope Voting.studentsController.prototype */ {

}) ;

/* >>>>>>>>>> BEGIN source/models/student.js */
// ==========================================================================
// Project:   Voting.Student
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Voting */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
Voting.Student = SC.Record.extend(
/** @scope Voting.Student.prototype */ {

  firstName: SC.Record.attr(String),
  lastName:  SC.Record.attr(String),
  number:    SC.Record.attr(String),
  votedAt:   SC.Record.attr(SC.DateTime),

  voteNow: function() {
    var message = "This will irreversibly mark %@ %@ as having voted.".fmt(this.get('firstName'),this.get('lastName')) ;
    var res = SC.AlertPane.warn("Are you sure?", message, null, "Vote", "Cancel", this) ;
  },

  alertPaneDidDismiss: function(a, b) {
    if (b == 'button1') {
      this.set('votedAt', SC.DateTime.create()) ;
    }
  }

}) ;


/* >>>>>>>>>> BEGIN source/data_sources/student.js */
// ==========================================================================
// Project:   Voting.StudentDataSource
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Voting */

require('models/student') ;
Voting.STUDENTS_QUERY = SC.Query.local(Voting.Student) ;

/** @class

  (Document Your Data Source Here)

  @extends SC.DataSource
*/
Voting.StudentDataSource = SC.DataSource.extend(
/** @scope Voting.StudentDataSource.prototype */ {

  // ..........................................................
  // QUERY SUPPORT
  //

  fetch: function(store, query) {

    if (query === Voting.STUDENTS_QUERY) {
      SC.Request.
        getUrl('/students/').
        header({'Accept':'application/json'}).
        json().
        notify(this, 'didFetchStudents', store, query).
        send() ;
      return YES ;
    }

    return NO ; // return YES if you handled the query
  },

  didFetchStudents: function(response, store, query) {
    if (SC.ok(response)) {
      var storeKeys = store.loadRecords(Voting.Student,
        Voting.StudentJSONProxy.normalize_student_data(response.get('body')));
      store.dataSourceDidFetchQuery(query) ;
    } else store.dataSourceDidErrorQuery(query, response) ;
  },

  // ..........................................................
  // RECORD SUPPORT
  //

  retrieveRecord: function(store, storeKey) {

    // TODO: Add handlers to retrieve an individual record's contents
    // call store.dataSourceDidComplete(storeKey) when done.

    return NO ; // return YES if you handled the storeKey
  },

  createRecord: function(store, storeKey) {

    // TODO: Add handlers to submit new records to the data source.
    // call store.dataSourceDidComplete(storeKey) when done.

    return NO ; // return YES if you handled the storeKey
  },

  updateRecord: function(store, storeKey) {

    if (SC.kindOf(store.recordTypeFor(storeKey), Voting.Student)) {
      SC.Request.putUrl("/students/"+store.idFor(storeKey)).
        header({'Accept': 'application/json'}).
        json().
        notify(this, this.didUpdateTask, store, storeKey).
        send(store.readDataHash(storeKey));
      return YES;
    }

    return NO ; // return YES if you handled the storeKey
  },

  didUpdateTask: function(response, store, storeKey) {
    if (SC.ok(response)) {

    } else {
      SC.AlertPane.error(
        "Error Recording Vote",
        "The vote couldn't be saved. The student may have already voted elsewhere.",
        "Try reloading the page if it seems like this should have worked.");
      store.dataSourceDidError(storeKey);
    }
  },

  destroyRecord: function(store, storeKey) {

    // TODO: Add handlers to destroy records on the data source.
    // call store.dataSourceDidDestroy(storeKey) when done

    return NO ; // return YES if you handled the storeKey
  }

}) ;

/* >>>>>>>>>> BEGIN source/student_json_proxy.js */
Voting.StudentJSONProxy = SC.Object.create({
  normalize_student_data: function(data) {
    var result = new Array();
    if (data.length == undefined) {
      var array_name = 'data.student' ;
      eval(array_name).guid = eval(array_name).id ;
      result.push(eval(array_name)) ;
    } else {
      for (var i=0 ; i<data.length ; i++) {
        var array_name = 'data[i].student';
        eval(array_name).guid = eval(array_name).id ;
        result.push(eval(array_name)) ;
      }
    }
    return result ;
  }
}) ;
/* >>>>>>>>>> BEGIN source/resources/main_page.js */
// ==========================================================================
// Project:   Voting - mainPage
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Voting */

var StudentView = SC.View.extend(SC.Control, {

  content: null,
  classNames: 'student-view',

  buildLabel: function(student) {
    return '<span class="student-label"><span class="first-name">%@</span> <span class="last-name">%@</span> <span class="number">(%@)</span></span>'.fmt(
      student.get('firstName'),
      student.get('lastName'),
      student.get('number'));
  },

  childViews: 'voteButton alreadyVotedLabel studentLabel'.w(),

  contentPropertyDidChange: function(target, key) {
    if(key == '*' || key == 'votedAt') {
      this.studentLabel.set('value', this.buildLabel(target));
      this.voteButton.set('target', target);
      if (target.get('votedAt')) {
        var str = target.get('votedAt').toFormattedString("%b %d, %H:%M");
        this.alreadyVotedLabel.set('value', "Voted %@".fmt(str));
        this.voteButton.set('isEnabled', false);
      }
    }
  },

  alreadyVotedLabel: SC.LabelView.extend({
    layout: { top: 16, right: 103, width: 200 },
    textAlign: SC.ALIGN_RIGHT,
    value: ""
  }),

  studentLabel: SC.LabelView.extend({
    layout: { top: 13, left: 13, height: 24, width: 300 },
    escapeHTML: false,
    value: ""
  }),

  voteButton: SC.ButtonView.extend({
    title: "Vote Now",
    action: 'voteNow',
    layout: { top: 13, right: 13, height: 24, width: 80 }
  })


});

// This page describes the main user interface for your application.
Voting.mainPage = SC.Page.design({

  // The main pane is made visible on screen as soon as your app is loaded.
  // Add childViews to this pane for views to display immediately on page
  // load.
  mainPane: SC.MainPane.design({
    childViews: 'topView mainView'.w(),

    topView: SC.ToolbarView.design({
      layout: { top: 0, left: 0, right: 0, height: 50 },
      childViews: 'logoView searchView'.w(),
      logoView: SC.ImageView.design({
        layout: { top: 0, left: 0, width: 113, height: 50 },
        value: 'http://burkelibbey.org/uwsa.png'
      }),
      searchView: SC.TextFieldView.design({
        layout: { top: 10, right: 10, width: 200, height: 30 },
        hint: 'Search for a Student',
        valueBinding: 'Voting.searchController.searchTerm'
      })
    }),

    mainView: SC.ScrollView.design({
      layout: { top: 50, left: 0, right: 0, bottom: 0 },
      contentView: SC.ListView.design({
        contentBinding: 'Voting.studentsController.arrangedObjects',
        selectionBinding: 'Voting.studentsController.selection',
        rowHeight: 50,
        exampleView: StudentView
      })

    })
  })
});

/* >>>>>>>>>> BEGIN source/main.js */
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

