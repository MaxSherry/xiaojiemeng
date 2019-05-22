const app = getApp()

Page({
	data: {
		word: "",
		searchData: [],
		activeNames: [],
		noData:false
	},
	onLoad(options) {
		let word = options.sw,
			searchData = [],
			activeNames = [];
		app.globalData.jiemeng.forEach(d => {
			let items = [];
			d.items.forEach(n => {
				if (n.indexOf(word) != -1) {
					console.log(n, word)
					items.push(n);
				}
			});
			if (items.length > 0) {
				searchData.push({
					dir: d.dir,
					items
				});
				activeNames.push(d.dir);
			}
		});

		this.setData({
			word: options.sw,
			searchData: searchData,
			activeNames: activeNames,
			noData:searchData.length==0
		})

	},
	onSearchFocus() {
		wx.navigateTo({
			//delta:1
			url: '../SearchTip/SearchTip'
		})
	},
	onSearchCancel() {
		wx.navigateBack({
			delta:2
			// url: '../JieMengList/JieMengList'
		})
	},
	onSearch(event) {
		this.setData({
			activeNames: event.detail,
		});

	}
})
