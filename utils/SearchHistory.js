const key = 'sw'

module.exports = {
    clear(){
		wx.clearStorage()
    },
    add(word){
        let sw = wx.getStorageSync(key)||''
        if (sw) {
            let words = sw.split(',')
            for(let i=0;i<words.length;i++){
                if(words[i] == word){
                    return
                }
            }
            sw +=','
        }
        sw += word
        wx.setStorageSync(key,sw)
    },
    load(){
        let sw = wx.getStorageSync(key)
        return sw ? sw.split(',') : []
    }
}