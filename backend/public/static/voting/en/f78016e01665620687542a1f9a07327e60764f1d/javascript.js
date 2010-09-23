(function(){var a="sproutcore/standard_theme";if(!SC.BUNDLE_INFO){throw"SC.BUNDLE_INFO is not defined!"
}if(SC.BUNDLE_INFO[a]){return}SC.BUNDLE_INFO[a]={requires:["sproutcore/empty_theme"],styles:["/static/sproutcore/standard_theme/en/8b65428a7dcfa2226586b487bde1bf11560de2aa/stylesheet-packed.css","/static/sproutcore/standard_theme/en/8b65428a7dcfa2226586b487bde1bf11560de2aa/stylesheet.css"],scripts:["/static/sproutcore/standard_theme/en/8b65428a7dcfa2226586b487bde1bf11560de2aa/javascript-packed.js"]}
})();Voting=SC.Application.create({NAMESPACE:"Voting",VERSION:"0.1.0",store:SC.Store.create({commitRecordsAutomatically:YES}).from("Voting.StudentDataSource")});
Voting.searchController=SC.ObjectController.create({searchTerm:null,searchTermDidChange:function(d,a){var c=new RegExp("^"+d.get(a),"i");
var g="firstName MATCHES({exp}) OR lastName MATCHES({exp}) OR number MATCHES({exp})";
var e={exp:c};var b=SC.Query.local(Voting.Student,g,e);var f=Voting.store.find(b);
Voting.studentsController.set("content",f)}.observes("searchTerm")});Voting.studentsController=SC.ArrayController.create({});
Voting.Student=SC.Record.extend({firstName:SC.Record.attr(String),lastName:SC.Record.attr(String),number:SC.Record.attr(String),votedAt:SC.Record.attr(SC.DateTime),voteNow:function(){var b="This will irreversibly mark %@ %@ as having voted.".fmt(this.get("firstName"),this.get("lastName"));
var a=SC.AlertPane.warn("Are you sure?",b,null,"Vote","Cancel",this)},alertPaneDidDismiss:function(d,c){if(c=="button1"){this.set("votedAt",SC.DateTime.create())
}}});require("models/student");Voting.STUDENTS_QUERY=SC.Query.local(Voting.Student);
Voting.StudentDataSource=SC.DataSource.extend({fetch:function(a,b){if(b===Voting.STUDENTS_QUERY){SC.Request.getUrl("/students/").header({Accept:"application/json"}).json().notify(this,"didFetchStudents",a,b).send();
return YES}return NO},didFetchStudents:function(b,a,d){if(SC.ok(b)){var c=a.loadRecords(Voting.Student,Voting.StudentJSONProxy.normalize_student_data(b.get("body")));
a.dataSourceDidFetchQuery(d)}else{a.dataSourceDidErrorQuery(d,b)}},retrieveRecord:function(a,b){return NO
},createRecord:function(a,b){return NO},updateRecord:function(a,b){if(SC.kindOf(a.recordTypeFor(b),Voting.Student)){SC.Request.putUrl("/students/"+a.idFor(b)).header({Accept:"application/json"}).json().notify(this,this.didUpdateTask,a,b).send(a.readDataHash(b));
return YES}return NO},didUpdateTask:function(b,a,c){if(SC.ok(b)){}else{SC.AlertPane.error("Error Recording Vote","The vote couldn't be saved. The student may have already voted elsewhere.","Try reloading the page if it seems like this should have worked.");
a.dataSourceDidError(c)}},destroyRecord:function(a,b){return NO}});Voting.StudentJSONProxy=SC.Object.create({normalize_student_data:function(data){var result=new Array();
if(data.length==undefined){var array_name="data.student";eval(array_name).guid=eval(array_name).id;
result.push(eval(array_name))}else{for(var i=0;i<data.length;i++){var array_name="data[i].student";
eval(array_name).guid=eval(array_name).id;result.push(eval(array_name))}}return result
}});var StudentView=SC.View.extend(SC.Control,{content:null,classNames:"student-view",buildLabel:function(a){return'<span class="student-label"><span class="first-name">%@</span> <span class="last-name">%@</span> <span class="number">(%@)</span></span>'.fmt(a.get("firstName"),a.get("lastName"),a.get("number"))
},childViews:"voteButton alreadyVotedLabel studentLabel".w(),contentPropertyDidChange:function(b,a){if(a=="*"||a=="votedAt"){this.studentLabel.set("value",this.buildLabel(b));
this.voteButton.set("target",b);if(b.get("votedAt")){var c=b.get("votedAt").toFormattedString("%b %d, %H:%M");
this.alreadyVotedLabel.set("value","Voted %@".fmt(c));this.voteButton.set("isEnabled",false)
}}},alreadyVotedLabel:SC.LabelView.extend({layout:{top:16,right:103,width:200},textAlign:SC.ALIGN_RIGHT,value:""}),studentLabel:SC.LabelView.extend({layout:{top:13,left:13,height:24,width:300},escapeHTML:false,value:""}),voteButton:SC.ButtonView.extend({title:"Vote Now",action:"voteNow",layout:{top:13,right:13,height:24,width:80}})});
Voting.mainPage=SC.Page.design({mainPane:SC.MainPane.design({childViews:"topView mainView".w(),topView:SC.ToolbarView.design({layout:{top:0,left:0,right:0,height:50},childViews:"logoView searchView".w(),logoView:SC.ImageView.design({layout:{top:0,left:0,width:113,height:50},value:"http://burkelibbey.org/uwsa.png"}),searchView:SC.TextFieldView.design({layout:{top:10,right:10,width:200,height:30},hint:"Search for a Student",valueBinding:"Voting.searchController.searchTerm"})}),mainView:SC.ScrollView.design({layout:{top:50,left:0,right:0,bottom:0},contentView:SC.ListView.design({contentBinding:"Voting.studentsController.arrangedObjects",selectionBinding:"Voting.studentsController.selection",rowHeight:50,exampleView:StudentView})})})});
Voting.main=function main(){Voting.getPath("mainPage.mainPane").append();var b=Voting.store.find(Voting.STUDENTS_QUERY);
Voting.studentsController.set("content",b);Voting.fullRefresh=function(){Voting.store.refreshQuery(Voting.STUDENTS_QUERY)
};var a=SC.Timer.schedule({target:this,action:"fullRefresh",interval:30000,repeats:true})
};function main(){Voting.main()};