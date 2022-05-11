function searchImage(url) {
	new Promise(getIndex)
		.then(index => {
			chrome.tabs.create({
				index: index,
				url: "https://yandex.ru/images/search?rpt=imageview&url=" + encodeURIComponent(url)
			});
		})
		.catch(() => {
			chrome.tabs.create({
				url: "https://yandex.ru/images/search?rpt=imageview&url=" + encodeURIComponent(url)
			});
		});
}

function getIndex(resolve, reject) {
	let ind;
	chrome.tabs.query({
		active: true,
		currentWindow: true
	}, tabs => {
		ind = tabs[0].index;
		if (!isNaN(ind)) {
			console.log('resolved');
			resolve(ind + 1);
		} else {
			console.log('rejected');
			reject(ind);
		}
	});
}

chrome.contextMenus.create({
	title: chrome.i18n.getMessage("entry"), 
	contexts: ["image"],
	onclick: function (info) {
		searchImage(info.srcUrl);
	}
});
