sap.ui.define(["sap/ui/core/mvc/Controller","sap/ui/model/json/JSONModel"],function(e,t){"use strict";return e.extend("chatui.controller.OfficalRightScreen",{onInit:function(){const e=new t;e.setData({conversationId:"",messageId:"",message_time:"",user_id:"",user_query:"",chatHistory:[],isBusy:false,enableTextArea:true});this.getView().setModel(e,"chatModel");this.getUserInfo();this.oOwnerComponent=this.getOwnerComponent();this.oRouter=this.oOwnerComponent.getRouter();this.oRouter.getRoute("conversation").attachPatternMatched(this.onRouteMatched,this)},getUserInfo:function(){const e=this.getBaseURL()+"/user-api/currentUser";var s=new t;var o={firstname:"Dummy",lastname:"User",email:"dummy.user@com",name:"dummy.user@com",displayName:"Dummy User (dummy.user@com)"};s.loadData(e);s.dataLoaded().then(()=>{console.log(s.getData());if(!s.getData().email){s.setData(o)}this.getView().setModel(s,"userInfo")}).catch(()=>{s.setData(o);this.getView().setModel(s,"userInfo")})},getBaseURL:function(){var e=this.getOwnerComponent().getManifestEntry("/sap.app/id");var t=e.replaceAll(".","/");var s=jQuery.sap.getModulePath(t);return s},onRouteMatched(e){this.clearChatHistory();const{conversationID:t}=e.getParameter("arguments");this.getView().bindElement({path:`/Conversation(${t})`});this.loadConversationHistory(t)},clearChatHistory:function(){const e=this.getView().getModel("chatModel");const t="/chatHistory";const s=[];e.setProperty(t,s)},loadConversationHistory(e){const s=sessionStorage.getItem("isDeployedVersion")==="true"?this.getBaseURL()+`/odata/v4/chat/Conversation(${e})/to_messages`:`/odata/v4/chat/Conversation(${e})/to_messages`;var o=new t;o.loadData(s);o.dataLoaded().then(()=>{this.setConversationHistory(o.getData())})},setConversationHistory(e){const t=this.getView().getModel("userInfo");const s=this.getView().getModel("chatModel");const o="/chatHistory";const a=s.getProperty(o);for(const s of e.value){const e={conversationId:s.cID_cID,messageId:s.mID,message_time:new Date(s.creation_time),content:s.content,user_id:"",user_role:s.role==="assistant"?"assistant ":"You",icon_path:s.role==="assistant"?"sap-icon://da-2":"",initials:s.role==="assistant"?"":t.getProperty("/firstname").charAt(0)+t.getProperty("/lastname").charAt(0)};a.push(e)}s.setProperty(o,a)},onSendMessage:function(e){this.setBusy(true);this.setEnableTextArea(false);const t=e.getParameter("value");const s=e.getSource();this.setUserQuestionInToChatMessage(t);const o=this.getView().getModel("chatModel");const a=o.getProperty("/conversationId");const n=JSON.stringify({conversationId:a,messageId:o.getProperty("/messageId"),message_time:o.getProperty("/message_time"),user_id:o.getProperty("/user_id"),user_query:o.getProperty("/user_query")});this.sendMessage(n).then(e=>{this.setBackendResponseInToChatMessage(e)}).catch(e=>{console.log(e)}).finally(()=>{this.setBusy(false);this.setEnableTextArea(true)})},setBusy:function(e){const t="/isBusy";this.getView().getModel("chatModel").setProperty(t,e)},setEnableTextArea:function(e){const t="/enableTextArea";this.getView().getModel("chatModel").setProperty(t,e)},setUserQuestionInToChatMessage(e){const t=this.getView().getModel("chatModel");const s="/chatHistory";const o=t.getProperty(s);const a=o[0].conversationId;const n=this.getView().getModel("userInfo");t.setProperty("/conversationId",a);t.setProperty("/messageId",self.crypto.randomUUID());t.setProperty("/message_time",(new Date).toISOString());t.setProperty("/user_query",e);t.setProperty("/user_id",n.getProperty("/email"));const r={conversationId:t.getProperty("/conversationId"),messageId:t.getProperty("/messageId"),message_time:new Date(t.getProperty("/message_time")),content:e,user_id:t.getProperty("/user_id"),user_role:"You",icon_path:"",initials:n.getProperty("/firstname").charAt(0)+n.getProperty("/lastname").charAt(0)};o.push(r);t.setProperty(s,o)},sendMessage:function(e){return new Promise((t,s)=>{$.ajax({url:sessionStorage.getItem("isDeployedVersion")==="true"?this.getBaseURL()+"/odata/v4/chat/getChatRagResponse":"/odata/v4/chat/getChatRagResponse",type:"POST",contentType:"application/json",async:true,data:e,success:function(e,o,a){console.log(a);if(a.status===200||a.status===201){t(a.responseJSON)}else{s(a.responseJSON)}},error:function(e,t){if(e){if(e.responseJSON){const t=e.responseJSON.message||e.responseJSON.status_msg;s(t)}else{s(e.responseText)}}else{s(t)}}})})},setBackendResponseInToChatMessage(e){const t=this.getView().getModel("chatModel");const s=t.getProperty("/conversationId");const o={conversationId:s,messageId:self.crypto.randomUUID(),message_time:new Date(e.messageTime),content:e.content,user_id:"",user_role:e.role,icon_path:"sap-icon://da-2",initials:""};const a="/chatHistory";const n=t.getProperty(a);n.push(o);t.setProperty(a,n)}})});
//# sourceMappingURL=OfficalRightScreen.controller.js.map