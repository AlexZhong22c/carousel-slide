;(function($){
	//末尾配  })(jQuery);
	//之所以只在形参使用$，是为了不与其他库冲突
//；的作用是用来规避：假如前面的script标签没有封好结尾标签而导致的错误
//知识点：匿名函数自执行的形式，把变量放在一个闭包里，这样变量就不会被污染掉！！
	var Carousel = function(poster){//声明一个叫Carousel的对象的构造函数
		//保存单个旋转木马对象,防止以后再有操作的话还要再保存一次
		this.poster = poster;//poster当做是一个属性

		 // console.log(poster.attr("data-setting"));
		 //默认配置参数
		 this.setting = {//setting当做是被创建的一个属性，它的值是一个JSON对象
		 	"width":1000,
            "height":270,
            "posterWidth":640,
            "posterHeight":270,

            "scale":0.9,
          	"verticalAlign":"middle",
            "speed":500
		 };
		 console.log(this.setting);
		 console.log(this.setting["abc"]);//undifined,但是控制台居然能显示abc，匪夷所思
		 console.log(this.getSetting());
		 //extend就是有这个属性的话就替换，没有这个属性的话就追加
		$.extend(this.setting,this.getSetting());//后面的参数会覆盖前面的参数，第一个参数就会被改变，同时以第一个参数作为返回
		//上面过程就是在得到一个修正后的this.setting
		console.log(this.setting);
		console.log(this.getSetting());
	};
	Carousel.prototype = {//在构造函数中充当声明 类函数（有别于对象函数）的作用？？
		//获取人工配置参数
		getSetting:function(){
			var setting = this.poster.attr("data-setting");//拿到以JSON为内容的字符串
			if(setting&&setting!=""){
				return $.parseJSON(setting);//将该字符串转化为JSON对象，方便引用
			}else{
				return{};//大概知道意思，但是不知道是不是这么写？？
				//觉得这句写成return setting不是更好？？
			};
			
			return setting;
		}
	};//查表
	//因为它是一个闭包，初始化之后是没有办法访问到这个类的:

	Carousel.init = function(posters){
		//但是作为集合的对象来处理是很不方便的
		//所以有几个DOM节点就要new几次

		var _this_ = this;//_this_就指的是第3行的Carousel，后两行new的时候这个对象才被创建
		posters.each(function(){
			new _this_($(this));//this只是一个oject对象，所以要包装成JQ对象
			//this代表的是集合中的每一个元素
			// var carousel2 = new Carousel($(".J_Poster").eq(1));
			//posters.里面的this 和 Carousel.里面的this不同？？
		});
	};

	window["Carousel"] = Carousel;//全局注册
	//因为它是一个闭包，所以index.html的Carousel.init($(".J_Poster"))就访问不到Carousel，所以需要全局注册
})(jQuery);




