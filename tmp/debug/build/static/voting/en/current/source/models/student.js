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

; if ((typeof SC !== 'undefined') && SC && SC.scriptDidLoad) SC.scriptDidLoad('voting');