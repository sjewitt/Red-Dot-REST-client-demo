/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var engine = {

    init : function(){
        console.log("Start...");
        
        this.getProjects();
    },


    getProjects : function(){   //abstract this as generic function thattakes parameters? err... yes.
        $.ajax("http://local.rqlservice/RqlServiceImpl.svc/projects/",
        {
            success: function(data){
                console.log(data);
                
                //1: build UI for PROJECTS. Attach click handlers to these.
                $("#projectlist").html(engine.buildProjectsListUI(data));
                $("#projectlist>div").each(function(){
                    $(this).css({cursor:"pointer"});
                }).click(function(){
                    engine.getPagesByProject($(this).attr("data-projectguid"));
                });
            },
            error:function(){},
            complete:function(){}
        });
    },
    
    getPagesByProject : function(projectGUID){
        $.ajax("http://local.rqlservice/RqlServiceImpl.svc/project/" + projectGUID + "/pages/",
        {
            success: function(data){
                console.log(data);
                
                //1: build UI for PAGES. Attach click handlers to these.
                $("#pagelist").html(engine.buildPageListUI(data,projectGUID));
                $("#pagelist>div").each(function(){
                    $(this).css({cursor:"pointer"});
                }).click(function(){
                    engine.getContentByPages($(this).attr("data-projectguid"),$(this).attr("data-pageguid"));
                });
            },
            error:function(){},
            complete:function(){}
        });
    },
    
    getContentByPages : function(projectGUID,pageGUID){
        $.ajax("http://local.rqlservice/RqlServiceImpl.svc/project/" + projectGUID + "/page/" + pageGUID + "/elements/",
        {
            success: function(data){
                console.log(data);
                
                //1: build UI for PAGES. Attach click handlers to these.
                $("#contentlist").html(engine.buildContentListUI(data));
//                $("#contentlist>div").each(function(){
//                    $(this).css({cursor:"pointer"});
//                }).click(function(){
//                    alert($(this).attr("data-pageguid"));
//                    engine.buildProjectsListUI();
//                });
            },
            error:function(){},
            complete:function(){}
        });
    },
    
    buildProjectsListUI : function(data){
        var ui = "";
        for(var a=0;a<data.projectsResult.length;a++){
            ui += "<div data-projectguid=\"" + data.projectsResult[a].ProjectGUID + "\" data-projectname=\"" + data.projectsResult[a].ProjectName + "\">" + data.projectsResult[a].ProjectName + "</div>";
        }
        return ui;
    },
    
    buildPageListUI : function(data,projectGUID){
        var ui = "";
        for(var a=0;a<data.pagesResult.length;a++){
            ui += "<div data-projectguid=\"" + projectGUID + "\" data-pageguid=\"" + data.pagesResult[a].PageGUID + "\" data-pageid=\"" + data.pagesResult[a].PageId + "\">" + data.pagesResult[a].Headline + "</div>";
        }
        return ui;
    },
    
    buildContentListUI : function(data,projectGUID,pageGUID){
        var ui = "";
        for(var a=0;a<data.contentResult.length;a++){
            ui += "<div data-type=\"" + data.contentResult[a].Type + "\" data-name=\"" + data.contentResult[a].Name + "\">" + data.contentResult[a].Value + "</div>";
        }
        return ui;
    }
};



$(function(){
    engine.init();
});
