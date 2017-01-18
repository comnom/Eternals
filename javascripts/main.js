// Whether the changelog is shown
var state = 0;
// The list of screenshot images
var imgList = [];
// Index of the screenshot list
var imgIndex = 0;


// Github api get request for the latest release
function apiGetLatest() {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var data = JSON.parse(this.responseText);
			document.getElementById("eternals-zip").href = 
			"https://github.com/comnom/Eternals/archive/" + data.tag_name + ".zip";
			document.getElementById("eternals-tar").href = 
			"https://github.com/comnom/Eternals/archive/" + data.tag_name + ".tar.gz";
			document.getElementById("current-version").innerHTML = 
			data.tag_name + " Released: " + data.published_at.split("T")[0];
			document.getElementById("changelog").innerHTML = data.body;
			document.getElementById("high-dpi").href = data.assets[0].browser_download_url;
		}
	};
    xhttp.open("GET", "https://api.github.com/repos/comnom/Eternals/releases/latest", true);
	xhttp.setRequestHeader("Accept", "application/vnd.github.v3+json");
	xhttp.send();
}

// Github api get request for the screenshots folder
function apiGetAssets() {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var data = JSON.parse(this.responseText);
			for (var i = 0; i < data.length; i++) {
				imgList.push(data[i].path);
			}
		}
	};
	xhttp.open("GET", "https://api.github.com/repos/comnom/Eternals/contents/images/screenshots?ref=gh-pages", true);
	xhttp.setRequestHeader("Accept", "application/vnd.github.v3+json");
	xhttp.send();
}

// Toggle the changelog view
function toggleChangelog() {
	var img = document.getElementById("changelog-arrow");
	var pre = document.getElementById("changelog");
	if (state) {
		state = 0;
		img.style.transform = "none";
		pre.style.display = "none";
	}
	else {
		state = 1;
		img.style.transform = "rotate(180deg)";
		pre.style.display = "block";
	}
}

// Functions for the screenshot gallery view
function showModal() {
	document.getElementsByClassName("modal-back")[0].style.display = "inline-block";
	document.getElementById("modal-image").src = imgList[imgIndex];
}

function closeModal() {
	document.getElementsByClassName("modal-back")[0].style.display = "none";
}

function nextImage() {
	if (imgIndex >= imgList.length - 1) {
		return;
	}
	imgIndex += 1;
	document.getElementById("modal-image").src = imgList[imgIndex];
}

function previousImage() {
	if (imgIndex <= 0) {
		return;
	}
	imgIndex -= 1;
	document.getElementById("modal-image").src = imgList[imgIndex];
}
