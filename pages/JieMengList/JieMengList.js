const app = getApp()
let jiemengData = [];

app.globalData.jiemeng.forEach(d => {
	let items = d.items;
	let nitems = [],
		tmp = "";
	items.forEach((l, i) => {
		if (i & (1 == 1)) {
			tmp += '' + l + "";
			nitems.push(tmp);
		} else if (i == items.length - 1) {
			nitems.push(l);
		}
		tmp = l + "  ";
	});

	jiemengData.push({
		dir: d.dir,
		items: nitems
	});
})

let timer = null,
	scrollTop = -1

function scrollDir(page, i, h) {
	let query = page.createSelectorQuery()
	query.select('#cellgroup' + i).fields({
		rect: true
	}, function(res) {
		if (i > 0 && res.top - h > 0) {
			scrollDir(page, i - 1, h)
		} else {
			clearTimeout(timer)
			page.setData({
				activeKey: i
			})
		}
	}).exec()
}

function endScroll(page, top) {
	if (scrollTop != top) {
		scrollTop = top
		if (timer != null) {
			clearTimeout(timer)
		}
		timer = setTimeout(function() {
			let query = page.createSelectorQuery()
			query.select('#search').fields({
				size: true
			}, function(res) {
				let h = res.height
				scrollDir(page, jiemengData.length - 1, h)
			}).exec()
		}, 300)

	}
}

Page({
	data: {
		jiemengData: jiemengData,
		activeKey: 0,
		cellGroupIndex: 0
	},
	onLoad(){
		wx.setNavigationBarTitle({
			title: '周公解梦@王新生'
		})
	},
	onSearchTap: function() {
		wx.navigateTo({
			url: '../SearchTip/SearchTip'
		})
	},
	onBadgeClick: function(event) {
		this.setData({
			cellGroupIndex: event.detail
		})
	},
	contentScroll: function(event) {
		let that = this,
			found = false

		endScroll(that, event.detail.scrollTop)
	}
})
