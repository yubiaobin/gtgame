/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2014-07-15 17:14:09
 * @version $Id$
 */

require.config({

	shim: {

　　　　　　'underscore':{
　　　　　　　　exports: '_'
　　　　　　},
　　　　　　'backbone': {
　　　　　　　　deps: ['underscore', 'jquery'],
　　　　　　　　exports: 'Backbone'
　　　　　　}
　　　　},

	paths: {
		"jquery"     :  "jquery-2.1.1.min",
		"jquery-m"   :  "jquery.mobile-1.4.3",
　　　　　"underscore" :  "underscore",
　　　　　"backbone"   :  "backbone-min",
        "SLslider"   :  "SLslider1.0",
        "swipeIndex" :  "swipe.min",
		"index"      :  "index"
　　　　}
});






require(['jquery', 'swipeIndex', 'jquery-m','underscore', 'backbone','index'], function (){

	
/*
	// 定义模型类
        window.Test = Backbone.Model.extend({
            default : {
                content : "haha"
            }
        });

        // 创建集合模型类
        window.TestList = Backbone.Collection.extend({
            model : Test
        });

        // 向模型添加数据
        var data = new TestList({
            content : "hello,backbone!"
        })

        // 创建view对象
        window.TestView = Backbone.View.extend({
            el          : $("body"),
            initialize  : function(){
                $("#divTip").html(data.models[0].get("content"))
            } 
        });

        // 实例化View对象
        window.APP = new TestView;
*/

    var bullets = document.getElementById('position').getElementsByTagName('li');
    var banner = Swipe(document.getElementById('mySwipe'), {
        auto: 2000,
        continuous: true,
        disableScroll:false,
        callback: function(pos) {
            var i = bullets.length;
            while (i--) {
              bullets[i].className = ' ';
            }
            bullets[pos].className = 'cur';
        }
    });

});


require(['jquery','SLslider1.0'], function($) {

	app.initialize();


    $(".slide-wrap").SLslider({
        automatic   : true,
        width       : 700,
        prevText    : "",
        nextText    : "",
        height      : 300,
        type        : "slide",
        automatic   : true,
        controller  : true,
        marksNum    : false,
        autoTime    : 5000
    });
       

$( "#mypanel" ).trigger( "updatelayout" );




});