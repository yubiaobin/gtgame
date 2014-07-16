(function($){
	//调试器
	function log(info){
		return console.log(info);
	}

	$.fn.SLslider = function(o){

		//默认参数
		var defaults = {

			//宽度-高度
			width : 700,
			height : 300,

			//效果类型 "slide" or "fade"
			type : "slide",

			//控制器文本
			prevText : "",
			nextText : "",

			//是否显示 控制器
			controller : true,

			//是否需要 无缝 or 有缝
			unceasing : true,

			//是否显示 标记 or 数字
			marks : true,
			marksNum : true,

			//是否自动执行
			automatic : false,
			//时间间距
			autoTime : 4500,
			//动画持续
			duration : 600
		}

		//更新参数
		var settings = $.extend({},defaults,o);

		//获取elements
		var _wrapper = this,
			list = _wrapper.find(">ul"),
			item = list.find(">li");

		//幻灯片总数
		var itemLength = item.length,

			//防止再次执行run
			on_off = true,

			//marks elements
			marks_el = null,

			//marks index
			marksIndex = 0,

			//fade before
			fade_before = null,

			//timer
			timer = null;

			var indexObj = {}
			//当前索引
			if(settings.type == "slide" && settings.unceasing){
				indexObj.currentIndex = 1;
			}else{
				indexObj.currentIndex = 0;
			}




		//初始化
		var init = function(){

			//初始属性
			initAttr();

			if(itemLength <= 1){
				return false;
			}

			//幻灯效果
			if(settings.type == "slide"){
				slide();
			}

			//控制器
			if(settings.controller){
				controller();
			}

			//标记控制器
			if(settings.marks){
				marks()
			}

			if(settings.automatic){
				automatic();

				//暂停
				pause();
			}

		}


		var initAttr = function(){
			var slideWrap = $("<div class='SLslider-wrapper'></div>");

			_wrapper.add(slideWrap).css({
				width : settings.width,
				height : settings.height,
				position : "relative"
			});

			slideWrap.append(list);
			_wrapper.append(slideWrap);

			if(settings.type == "fade"){
				fade_before = item.css({
					position : "absolute",
					left : 0,
					top : 0
				}).first().addClass("SLslider-fade-zIndex2");
			}

		}


		var slide = function(){

			//无缝设置
			if(settings.unceasing){
				//clone first and last
				var first_clone = item.first().clone(),
					last_clone = item.last().clone();

				list.append(first_clone);
				list.prepend(last_clone);

				item = item.add(first_clone.add(last_clone));

			}

			//设置水平排列
			item.css({
				float : "left",
				position : "relative"
			});

			//list的总宽度
			list.addClass("SLslider-slide-list").css({
				width : settings.width * (itemLength+2),
				left : -indexObj.currentIndex * settings.width
			});

		}


		var marks = function(){
			var i=1,
				num = itemLength,
				html = "";
				marks_el = $("<div class='SLslider-marks'></div>");

			for( ; i<=num;i++){
				if( i == 1){
					html += "<a href='#' class='SLslider-marks-current'>"+(settings.marksNum ? i : '')+"</a>";
				}else{
					html += "<a href='#'>"+(settings.marksNum ? i : '')+"</a>";
				}
			}

			marks_el.append(html);
			_wrapper.append(marks_el);

			marks_el.find("a").each(function(index){
				$(this).bind("click",function(event){
					event.preventDefault();
					if(settings.type == "slide" && settings.unceasing){
						if(indexObj.currentIndex == index+1){
							//防止多次点击
							return false;
						}
						indexObj.currentIndex = index+1;
					}else{
						if(indexObj.currentIndex == index){
							//防止多次点击
							return false;
						}
						indexObj.currentIndex = index;
					}

					run();
				})
			})

		}


		var controller = function(){
			var fitTogether = $("<a href='#' class='SLslider-prev'>"+settings.prevText+"</a>")
								.add("<a href='#' class='SLslider-next'>"+settings.nextText+"</a>");

			//添加到wrapper					
			_wrapper.append(fitTogether);


			fitTogether.bind("click",function(event){
				event.preventDefault();

				//判断按下prev or next
				if($(this).hasClass("SLslider-prev")){
					if(on_off){
						indexObj.currentIndex--;
						run();
					}
				}else if($(this).hasClass("SLslider-next")){
					if(on_off){
						indexObj.currentIndex++;
						run();
					}
				}

			})

			//遍历controller获取不同height
			fitTogether.each(function(){
				$(this).css({
					top : _wrapper.height()/2-$(this).height()/2
				});
			});
		}

		var pause = function(){
			_wrapper.mouseenter(function(){
				timer && clearInterval(timer);
			});

			_wrapper.mouseleave(function(){
				automatic();
			});
		}

		var automatic = function(){
			timer = setInterval(function(){
				if(on_off){
					indexObj.currentIndex++;
					run();
				}
			},settings.autoTime);
		}

		var run = function(){
			//暂时关闭run,防止未执行完成,再次执行.
			on_off = false;

			if(settings.type == "slide"){
				if(!settings.unceasing){
					//有尽头
					if(indexObj.currentIndex <= -1){
						indexObj.currentIndex = itemLength-1;
					}
					if(indexObj.currentIndex >= itemLength){
						indexObj.currentIndex = 0;
					}
					list.stop(true,true).animate({
						left : -indexObj.currentIndex * settings.width
					},settings.duration);
					if(settings.marks){
						marks_el.find("a").removeClass("SLslider-marks-current");
						marks_el.find("a").eq(indexObj.currentIndex).addClass("SLslider-marks-current");
					}
					on_off = true;
				}else{
					//无止境
					if(settings.marks){
	                    marksIndex = indexObj.currentIndex-1;

	                    if(marksIndex == itemLength){
	                        marksIndex = 0;
	                    }
	                    else if(marksIndex == -1){
	                        marksIndex = itemLength-1;
	                    }
	                    marks_el.find("a").removeClass("SLslider-marks-current");
						marks_el.find("a").eq(marksIndex).addClass("SLslider-marks-current");
	                }
					list.stop(true,true).animate({
						left : -indexObj.currentIndex * settings.width
					},settings.duration,function(){
						if(indexObj.currentIndex == itemLength+1){
							$(this).css({
								left : -1 * settings.width
							});
							indexObj.currentIndex = 1;
						}
						if(indexObj.currentIndex == 0){
							$(this).css({
								left : -itemLength * settings.width
							});
							indexObj.currentIndex = itemLength;
						}
						on_off = true;
					});

				}
			}else if(settings.type == "fade"){
				if(indexObj.currentIndex <= -1){
					indexObj.currentIndex = itemLength-1;
				}
				if(indexObj.currentIndex == itemLength){
					indexObj.currentIndex = 0;
					if(item.is(".SLslider-fade-zIndex1")){
						item.removeClass("SLslider-fade-zIndex1");
					}
				}

				item.eq(indexObj.currentIndex).css({
					"opacity" : "0"
				}).addClass("SLslider-fade-zIndex2").fadeTo("slow",1,function(){
					$(".SLslider-fade-zIndex1").removeClass("SLslider-fade-zIndex1");
					$(this).addClass("SLslider-fade-zIndex1").removeClass("SLslider-fade-zIndex2");
					if(item.eq(0).hasClass("SLslider-fade-zIndex2")){
						item.eq(0).removeClass("SLslider-fade-zIndex2");
					}
					on_off = true;
				});


				if(settings.marks){
					marks_el.find("a").removeClass("SLslider-marks-current");
					marks_el.find("a").eq(indexObj.currentIndex).addClass("SLslider-marks-current");
				}

			}

		}

		//程序入口
		init();

	}
})(jQuery);