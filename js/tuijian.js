$(function() {
	var lingindex=0;
	var sixindex=6;
	var fontindex=12;
	var night=8;
	var audio=$("#audio")[0];
	var impurl='http://www.arthurdon.top:3000/song/url';
	window.song={};
	var cat=[];
	function  gedan(data){
		$.each(data, function(i, v) {
			$div = $(
				`<li id="${v.id}" class="foss">
					<div class="uls-img">
					<img class="img-box" src="${v.picUrl}">
					<div class="img-logo">
					<div class="logo-fl fl">
					<i class="fl"></i><span class="fl">${v.trackCount}万</span>
					</div>
					<div class="logo-fr fr">
									   <i></i>
					</div>
					</div>
					</div>
					<div class="uls-text">
									${v.name}
								</div>
							</li>`
			);
		$(".song-gaine .uls").append($div);
		})
	}
	//获取缓存数据
	var newgaine=localStorage.getItem(".song-gaine");
	$.ajax({
		type: "GET",
		url: "http://www.arthurdon.top:3000/personalized",
		success: function(result) {
			//获取所有歌单
			console.log("歌单===>",result.result);
			//获取随机的6个歌单
			// var sixsong=parseInt(Math.random()*);
			var sixsong=(result.result.slice(lingindex,lingindex+sixindex));
			lingindex+=sixindex;
			//缓存在本地存储
			localStorage.setItem('.son g-gaine', JSON.stringify(result));		
			newgaine=result;
		   gedan(sixsong);
		}
	})
	
	//推荐歌曲随机切换
	$(".song-btn .btn").on("click",function(){
		$(".song-gaine .uls").empty();
		console.log("ssss",newgaine);
		//将缓存的数据提取出来
		var fontsong=(newgaine.result.slice(sixindex,fontindex));
		  sixindex+=6;
		  fontindex+=6;
		if(fontindex>30){
			sixindex=0;
			fontindex=6;
		}
		// console.log("sixindex",sixindex)
		// console.log("fontindex",fontindex)
		gedan(fontsong);
	})


    //通过点击歌单li获取歌单详情
	$(".song-gaine .uls").on("click",".foss",function(){
		//获取歌单ID
		var songid=$(this).attr("id");
		// console.log(songid);
		
		$('.header').hide().attr('name', 'song0');
		$('.QQ-text').hide().attr('name', 'song0');	
		$('.anime-recomnt').show().attr('name', 'song1');
		//创建歌单详情
		$.ajax({
			type:"GET",
			url:"http://www.arthurdon.top:3000/playlist/detail?id="+songid,
			success:function(result){				
				// 截取8个歌曲
				var nightsong=(result.playlist.tracks.slice(0,night));
				console.log("nightsong",result);
				//缓存当前数据
				localStorage.setItem('result', JSON.stringify(result));
				// console.log(result.playlist.coverImgUrl)
				gaine(result.playlist.tracks);
				$(".reconmnt-return").css({
					backgroundImage:"url("+result.playlist.coverImgUrl +")"       
				})
				$(".fals-1 span").text(result.playlist.name);
				
			}
		})
	})
	
	//生成歌单详情页面数据
	function gaine(data){
		var n=0;
		$.each(data,function(i, v){
			$div=$(`<li data-id=${v.id} data-name="0" data-play="0" class="transmit">
					  <span class="span">${i+1}</span>
					  <div class="ul-li">
						  <div class="ul-lileft fl">
						  <img class="mp3img" src="${v.al.picUrl}">
							  <span class="sp1">${v.name}</span>
							  <span class="ick"><i class="fl"></i><strong class="fl">${v.ar[0].name}</strong></span>
						  </div>
						  <div class="ul-liright">
							  <i class="i11"></i>
							  <i class="i12"></i>
						  </div>
					  </div>
				  </li>`);
				  n=i+1;
				 $(".list-ul").append($div);
				 $(".list-fl").find("p").text("("+n+")");
		})
		
	}
	//返回页面
	$(".return-logo i").on("click",function(){
		console.log("1")
		$('[name="song1"]').hide();
			$('[name="song0"]').show();	
		$('.list-ul').empty();
	})
	var timers=[];
	var isHas=true;
	var startIndex=10;
	var count=10;
	//歌曲加载
	
	$("#recomnt").on("scroll",function(){
		var self=this;
		//从缓存获得数据
		var currentSongs = JSON.parse(localStorage.getItem('result'));
		var songData = currentSongs.playlist.tracks;
		var timer=setTimeout(function(){
			for (var i = 1; i < timers.length; i++) {
			  clearTimeout(timers[i]);
			}
			var scrollTop=$(self).scrollTop();
			console.log(scrollTop);
			if(scrollTop>=100){
				$(".fiex").show();
			}else{
				$(".fiex").hide();
			}
			//获取最后一个节点
			var last = $('.transmit').last();
			var lastTop = last.offset().top;
			var lastHeight = parseFloat(last.css('height'));
			console.log("lastHeight===>",lastTop);
			if (scrollTop + lastHeight >= lastTop) {
			  //每次加载10条数据
			  var data = songData.slice(startIndex, startIndex + count);
			  gaine(data);	
			  //重置下次开始截取数据的下标
			  startIndex += count;
			  gaine(data);			
			  if (data.length < count) {
			    //本次不足10条数据，下次没有数据可加载
			    isHas = false;
			  }
			}
			
			timers = [];
		},500)
		timers.push(timer);
	})
	//监听播放歌曲
	audio.oncanplay=function(){
		console.log("ok");
		this.play();
		var xdmusic=$(".transmit.con");
		console.log("xdmusic==>",xdmusic);
		xdmusic.data("play",1);
		//获取歌曲id
		var songId=xdmusic.data("id");
		console.log("songID",songId);
		
		//获取最近播放歌曲		
		var recentSongsList = JSON.parse(localStorage.getItem("recentSongsList"));	
		console.log("最近播放歌曲",recentSongsList);
		for (var i = 0; i < recentSongsList.length; i++) {
		  if (songId == recentSongsList[i].songId) {
		    return;
		  }
		}
		song.songId=songId;
		song.imgUrl=xdmusic.find("img").attr("src");
		song.songName=xdmusic.find(".sp1").text();
		song.singerName=xdmusic.find("strong").text();
		console.log("song==>",song);
		if (recentSongsList.length >= 99) {
		  recentSongsList.pop();
		}
		recentSongsList.unshift(song);
		localStorage.setItem('recentSongsList', JSON.stringify(recentSongsList));
		//最近播放效果附加
		
	}
	//绑定歌单歌曲播放
	
	$(".list-ul").on("click",".transmit",function(){
		$(this).addClass("con").siblings().removeClass("con");
		if($(this).hasClass("con")){
			var playStatus = $(this).data('play');
			console.log("----",playStatus)
			if(playStatus==1){
				audio.pause();
				$(this).data("play",0);
				$(".font-size1").attr("data-kk",0);
				$(".font-size1").find(".i1").css({
					backgroundImage: 'url("./icons/播放.png")'
				});
				$(".font-img").removeClass("active");
				return;
			}else{
				audio.play();
				$(".font-size1").attr("data-kk",1);
				$(".font-size1").find(".i1").css({
					backgroundImage: 'url("./icons/暂停.png")'
				});
				$(".font-img").addClass("active");
				$(this).data("play",1).siblings().data("play",0);
				console.log($(this).data("id"));
				//获取歌曲ID
				var songid=$(this).data("id");
				//获取头像
				var imgpm=$(this).find("img").attr("src");
				//获取歌曲名字
				var  pmtext=$(this).find(".sp1").text();
				//获取歌手名字
				var  pmfont=$(this).find(".ick strong").text();				
				// song.songId=songid;
				// song.songName=pmtext;
				// song.singerName=pmfont;				
				// var cat = JSON.parse(localStorage.getItem('cat'));	
				// recentSongsList.push(song);
				// cat.unshift(song);
				// localStorage.setItem('recentSongsList', JSON.stringify(song));
				$(this).attr("data-name",1);
				
				$.ajax({
				  type: 'GET',
				  url:impurl,
				  data: {
				    id: songid
				  },
				success:function(result){
					console.log("2222",result);
					//设置audio链接
					$(audio).attr('src', result.data[0].url);
					//保存音频连接
					songmp3=result.data[0].url;			
					//扭转头像
					$(".font-fl").find(".font-img").addClass("active").attr("src",imgpm);
					//歌名插入
					$(".font-fl").find(".sp1").text(pmtext);
					//歌手名字插入
					$(".font-fl").find(".sp2").text(pmfont);
					$(".font-size1").find(".i1").attr("data-kk",1);
					$(".font-size1").find(".i1").css({
						 backgroundImage: 'url("./icons/暂停.png")',
				
					})
				},
				})
			}
		}
		
	})
	// 播放按钮绑定事件

	//获取data值
	
	$(".font-size1 .i1").on("click",function(){
		var i1data=$(this).data("kk");
		if(i1data==1){
			audio.pause();
			$(this).attr("data-kk",0);
			$(this).css({
				backgroundImage: 'url("./icons/播放.png")'
			})
			$(".font-img").removeClass("active");
		}else if(i1data==0){
			audio.play();
			$(this).attr("data-kk",1);
			$(this).css({
				backgroundImage: 'url("./icons/暂停.png")'
			})
			$(".font-img").addClass("active");
		}
	})


})
