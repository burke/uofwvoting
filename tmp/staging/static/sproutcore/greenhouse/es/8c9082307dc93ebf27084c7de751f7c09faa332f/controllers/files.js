// ==========================================================================
// Project:   Greenhouse.filesController
// Copyright: ©2009 My Company, Inc.
// ==========================================================================
/*globals Greenhouse */

/** @class


  @extends TreeController
*/
Greenhouse.filesController = SC.TreeController.create(SC.CollectionViewDelegate,
/** @scope Greenhouse.filesController.prototype */ {

  // ..........................................................
  // Drag and drop support
  // 
  collectionViewValidateDragOperation: function(view, drag, op, proposedInsertionIndex, proposedDropOperation) {
    return SC.DRAG_ANY;
  },

  collectionViewPerformDragOperation: function(view, drag, op, proposedInsertionIndex, proposedDropOperation) {
    console.log('delegate works');
    return SC.DRAG_NONE ;
  },


  treeItemChildrenKey: "contents",
  
  /**
    Call this method whenever you want to relaod the files from the server.
  */
  reload: function() {
    var fileQuery = Greenhouse.FILES_QUERY, target = Greenhouse.targetController.get('content');
    fileQuery.set('urlPath', target.get('name'));
    var files = Greenhouse.store.find(fileQuery), root = SC.Object.create({treeItemIsExpanded: YES});
    root.set('contents', files);
    this.set('content', root);
  }
}) ;
