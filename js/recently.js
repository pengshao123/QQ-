$(function(){
	//显示最近播放列表显示事件
	$(".font-size1 .i2").on("click",function(){
		$(".empty-uls").empty();
		console.log("1")
		//生成列表Li
		var songsList = JSON.parse(localStorage.getItem('recentSongsList'));
		$.each(songsList,function(i, v){
			var $div=$(`<li>
							 <div class="li-text fl"   data-id="${v.songId}" data-audiourl="${v.audioUrl}">
								 <span class="fl cat">${v.songName}</span><i class="is fl"></i>
								 <span class="cpt fl">-${v.singerName}</span>
								 <div class="note fl">
									 <i class=""></i>
									 <i class=""></i>
									 <i class=""></i>
									 <i class=""></i>
									 <i class=""></i>
								 </div>
							 </div>
							 <div class="li-empty fr">
								 <i class="delete"></i>
							 </div>
						 </li>`);
						$(".empty-uls").append($div);
			
			
		})
		//获取当前播放歌曲的ID
		var presentID=$(".transmit.con").data("id");
		if(presentID!=undefined){
			$(".empty-uls>li").each(function(i, v){
				var dataid=$(v).find(".li-text").data("id");
				console.log(dataid);
				if(presentID==dataid){
					$(v).find(".cat").addClass("green");
					$(v).find(".note>i").addClass("conding");
				}
			})
		}
		//列表显示
		$(".box").show().animate({
			top:0+"px"
		},300)
		//隐藏列表
		$(".box").on("click",function(e){
			var target=e.target;
			if(target==this){
				$(this).animate({
					top:"100%"
				},300,function(){
					$(this).hide();
				})
			}
		})
	    $(".empty-close").on("click",function(){
			$(".box").hide().animate({
				top:"100%"
			},300,function(){
				$(".box").hide();
			})
		})	
	})
	//最近播放列表播放歌曲
	$(".empty-uls").on("click","li",function(){
		$(this).find(".note>i").addClass("conding");
		$(this).find(".cat").addClass("green");
		$(this).siblings().find(".note>i").removeClass("conding");
		$(this).siblings().find(".cat").removeClass("green");
	})
	
	//删除最近播放歌曲
	$(".empty-uls").on("click",".delete",function(e){
		e.stopPropagation();
		var parnt=$(this).parents(".empty-uls>li");
		var parntID=parnt.find(".li-text").data("id");
		console.log("删除歌曲的ID==>",parntID);
		var recentSongs = JSON.parse(localStorage.getItem('recentSongsList'));
		$.each(recentSongs,function(i, v){
			if(v.songId==parntID){
				recentSongs.splice(i, 1);			
				parnt.remove();
				localStorage.setItem('recentSongsList', JSON.stringify(recentSongs));
				return false;
			}
		})
	})
	//删除全部歌曲
	$(".empty-fr").find(".empty").on("click",function(e){
		e.stopPropagation();
		var recentSongs = JSON.parse(localStorage.getItem('recentSongsList'));
		var parnt=$(this).parents(".empty-uls>li");
		$.each(recentSongs,function(i, v){
			parnt.remove();
			localStorage.setItem('recentSongsList', JSON.stringify(i));
			return false;
		})
		
		
		
	})
})