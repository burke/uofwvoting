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
