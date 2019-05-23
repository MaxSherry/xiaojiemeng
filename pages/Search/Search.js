const app = getApp()

Page({
	data: {
		word: "",
		searchData: [],
		activeNames: [],
		isCancelTap: false,
		noData: false
	},
	onLoad(options) {
		let word = options.sw,
			searchData = [],
			activeNames = [];
		app.globalData.jiemeng.forEach(d => {
			let items = [];
			d.items.forEach(n => {
				if (n.indexOf(word) != -1) {
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
			noData: searchData.length == 0
		})

		wx.setNavigationBarTitle({
			title: '周公解梦@王新生'
		})

	},
	onSearchTap(event) {
		if (!this.data.isCancelTap) {
			wx.navigateTo({
				//delta:1
				url: '../SearchTip/SearchTip'
			})
		}else{
			this.data.isCancelTap = false
			wx.navigateBack({
				delta:2
			})
		}
	},
	onSearchCancel() {
		this.data.isCancelTap = true
		/* wx.navigateBack({
			delta:2
			// url: '../JieMengList/JieMengList'
		}) */
	}
})
