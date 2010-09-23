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
; if ((typeof SC !== 'undefined') && SC && SC.scriptDidLoad) SC.scriptDidLoad('voting');