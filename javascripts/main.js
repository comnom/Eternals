function apiGet() {
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
		}
	};
    xhttp.open("GET", "https://api.github.com/repos/comnom/Eternals/releases/latest", true);
	xhttp.setRequestHeader("Accept", "application/vnd.github.v3+json");
	xhttp.send();
}

var state = 0;

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
