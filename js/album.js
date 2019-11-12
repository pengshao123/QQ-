$(function(){
	var sixindex=6;
	var impurl='http://www.arthurdon.top:3000/song/url';
	function  gedan(data){
		$.each(data, function(i, v) {
			$div = $(
				`<li id="${v.id}">
					<div class="uls-img">
					<img class="img-box" src="${v.picUrl}">
					<div class="img-logo">
					<div class="logo-fl fl">
					<i class="fl"></i><span class="fl">${v.size}万</span>
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
		$(".album-list .uls").append($div);
		})
	}
	$.ajax({
		type: "GET",
		url: "http://www.arthurdon.top:3000/album/newest",
		success: function(result) {
			//获取最新专辑
			console.log("专辑===》",result.albums);
		  gedan(result.albums);
		  //缓存歌单数据
		  localStorage.setItem('else', JSON.stringify(result));
		}
	})
	//点击专辑
	$(".album-list ul").on("click","li",function(){
		$(".cat-ul").empty();
		//获取专辑ID
		var elseID=$(this).attr("id");
		$(".fiex").hide();
		console.log(elseID);
		$('.header').hide().attr('name', 'song0');
		$('.QQ-text').hide().attr('name', 'song0');	
		$('.songlist1').show().attr('name', 'song1');
		//获取专辑信息
		$.ajax({
			type:"GET",
			url:"http://www.arthurdon.top:3000/album?id="+elseID,
			success:function(conste){
				console.log("专辑内容==>",conste);
				$(".list-img img").attr("src",conste.album.picUrl);
				$(".fonndone1").text(conste.album.name);
				$(".fonndone2").find("span").text(conste.album.artist.name);
				$(".fonndone2").find("img").attr("src",conste.album.artist.picUrl);
			//将专辑内容进行缓存
			localStorage.setItem('conste-vv', JSON.stringify(conste));
			    elsef(conste.songs);
				console.log("----",conste.songs);
			}
		})
	})
	
	//创建专辑歌曲
	function  elsef(data){
		var n=0;
		$.each(data,function(i, v){
			$div=$(`<li data-id=${v.id} data-name="0" data-dom="0" class="transmit">
									<span class="span">${i+1}</span>
									<div class="ul-li">
										<div class="ul-lileft fl">
											<img class="mp3img" src="${v.al.picUrl}">
											<span class="sp1">${v.name}</span>
											<span class="ick"><i class="fl"></i><strong class="fl">${v.ar[0].name}</strong></span>
										</div>
										<div class="ul-liright">
											<i class="i12"></i>
										</div>
									</div>
								</li>`);
					$(".cat-ul").append($div);
					n=i+1;
					$(".cat-left").find("strong").text("("+n+")");
		})
	}
	
	$(".cat-ul").on("click",".transmit",function(){
		$(this).addClass("con").siblings().removeClass("con");
		if($(this).hasClass("con")){
			var playStatus=$(this).data("dom");
			console.log("playStatus==>",playStatus)
			if(playStatus==1){
				audio.pause();
				$(this).data("dom",0);
				$(".font-size1").attr("data-kk",0);
				$(".font-size1").find(".i1").css({
					backgroundImage: 'url("./icons/播放.png")'
				});
				$(".font-img").removeClass("active");
				return;
			}else{
				audio.play();
				$(this).data("dom",1);
				$(".font-size1").attr("data-kk",1);
				$(".font-size1").find(".i1").css({
					backgroundImage: 'url("./icons/暂停.png")'
				});
				$(".font-img").addClass("active");
				//获取专辑歌曲ID值
				var catid=$(this).data("id");
				//获取头像
				var imgpm=$(this).find("img").attr("src");
				console.log(imgpm);
				//获取歌曲名字
				var  pmtext=$(this).find(".sp1").text();
				//获取歌手名字
				var  pmfont=$(this).find(".ick strong").text();	
			   $(this).attr("data-name",1);
			   $.ajax({
			     type: 'GET',
			     url:impurl,
			     data: {
			       id: catid
			     },
			     success:function(result) {
			     	//设置audio链接
			     	$(audio).attr('src', result.data[0].url);
			     //扭转头像
			     $(".font-fl").find(".font-img").addClass("active").attr("src",imgpm);
			     //歌名插入
			     $(".font-fl").find(".sp1").text(pmtext);
				 //头像插入
				 $(".font-fl").find(".font-img").attr("src",imgpm)
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
	//返回页面
	$("songlist .return-logo").find("i").on("click",function(){
		console.log("1")
		$('[name="song1"]').hide();
			$('[name="song0"]').show();	
		
	})
})