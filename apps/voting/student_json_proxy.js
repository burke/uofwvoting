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