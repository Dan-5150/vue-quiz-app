"use strict";(self["webpackChunkquiz_app"]=self["webpackChunkquiz_app"]||[]).push([[166],{65:function(e,t,i){i.r(t),i.d(t,{default:function(){return f}});var s=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("section",[i("base-card",{attrs:{classes:"card-sm text-left"}},[i("h1",[e._v("Edit Question")]),i("question-form",{attrs:{"process-type":"edit","edit-question":e.selectedQuestion},on:{"question-form":e.submitForm}})],1)],1)},n=[],o=i(3019),u=(i(9826),i(1539),i(4916),i(5306),i(629)),r=i(5079),c={components:{"question-form":r.Z},props:{id:{type:String,required:!0}},data:function(){return{selectedQuestion:null}},computed:(0,o.Z)({},(0,u.rn)("questions",["questions"])),created:function(){var e=this;this.selectedQuestion=this.questions.find((function(t){return t.id===e.id})),console.log(this.selectedQuestion)},methods:(0,o.Z)((0,o.Z)({},(0,u.OI)("questions",{editQuestionStore:"editQuestion"})),{},{submitForm:function(e){if(console.log("formData",e),"multipleChoice"===e.questionType){var t={id:this.selectedQuestion.id,question:e.question,questionType:e.questionType,choices:e.choices};this.editQuestion(t)}else{var i={id:this.selectedQuestion.id,question:e.question,questionType:e.questionType,answer:e.textAnswer};this.editQuestion(i)}},editQuestion:function(e){this.editQuestionStore(e),this.$router.replace("/questions")}})},d=c,l=i(1001),a=(0,l.Z)(d,s,n,!1,null,null,null),f=a.exports},9826:function(e,t,i){var s=i(2109),n=i(2092).find,o=i(1223),u="find",r=!0;u in[]&&Array(1)[u]((function(){r=!1})),s({target:"Array",proto:!0,forced:r},{find:function(e){return n(this,e,arguments.length>1?arguments[1]:void 0)}}),o(u)}}]);
//# sourceMappingURL=edit-question-legacy.fb9cec1e.js.map