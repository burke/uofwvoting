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
        this.alreadyVotedLabel.set('value', "Voted at %@".fmt(str));
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
; if ((typeof SC !== 'undefined') && SC && SC.scriptDidLoad) SC.scriptDidLoad('voting');