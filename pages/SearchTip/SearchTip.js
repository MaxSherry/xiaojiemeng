let SearchHistory=require('../../utils/SearchHistory')

Page({
	data: {
		sw:'',
		words:[]
	},
	onLoad:function(){
		this.setData({
			words:SearchHistory.load()
		})
	},
	onSearch:function(event){
		let detail = event.detail.trim()
		if(detail != ''){
			SearchHistory.add(detail)
			wx.redirectTo({
				url:'../Search/Search?sw='+detail
			})
		}
		
	},
	onTagSearch:function(event){
		let word = event.target.dataset.word
		wx.redirectTo({
			url:'../Search/Search?sw='+word
		})
	},
	onSearchCancel:function(){
		wx.navigateBack({
			delta:1
		})
	},
	onClearSearchHistory:function(){
		SearchHistory.clear();
		this.setData({
			words:[]
		})
	}
})
