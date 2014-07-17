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
        "swipeIndex" :  "swipe.min",
		"index"      :  "index"
　　　　}

});






require(['jquery', 
        'swipeIndex', 
        'jquery-m',
        'underscore', 
        'backbone',
        'index'], function (){


    app.initialize();


       

    $( "#mypanel" ).trigger( "updatelayout" );

          



            
// Backbone框架控制首页数据读取脚本

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
















// 首页幻灯片控制脚本
    var bullets = document.getElementById('control-position').getElementsByTagName('li');
    var banner = Swipe(document.getElementById('mySwipe'), {
        auto: 2000,
        continuous: true,
        disableScroll:true,
        callback: function(pos) {
            var i = bullets.length;
            while (i--) {
              bullets[i].className = ' ';
            }
            bullets[pos].className = 'cur';
        }
    });







});


