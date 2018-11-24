var listEntries = function (object) {
	for (var i=0; i < object.children.length; i++) {
		var userName = object.children[i].name;
		console.log(userName);
		console.log(object);
		if (String(userName) == "Openwest Toolkit") {
			console.log("Found openwest toolkit");
			createList(userName, "li", "toolkit", "toolkit");
			createClickable(userName, userName, "javascript:void(0);", "toggle");
			createList(userName + "-ul", "ul", userName, "inner");
			recursion(object, object.children[i].children[0].children, userName + "-ul");
		}
		else {
			createList(userName, "li");
			createClickable(userName, userName, "javascript:void(0);");
			createList(userName + "-ul", "ul", userName, "inner");
			recursion(object, object.children[i].children[0].children, userName + "-ul");
		}
	}
}

var createList = function(id, type, parentId="main", className="name") {
	var list = document.createElement(type); //type must be ul or li
	list.id = id;
	list.className = className;
	var element = document.getElementById(parentId);
	element.appendChild(list);
}

var createClickable = function (text, parent, href, className="toggle") {
	var clickable = document.createElement("a");
	clickable.className = className;
	clickable.innerHTML = text;
	clickable.href = href;
	var element = document.getElementById(parent);
	element.appendChild(clickable);
}

var addDownloads = function (fileName, listName, path, contentExist) {
	if (contentExist == true) {
		var files = document.createElement("li"); //create list	
		var link = document.createElement("a"); //create link
		link.href = "http://192.168.105.240/" + path;
		link.target = "_blank";
		link.innerHTML = fileName;
		link.className = "files";
		//var node = document.createTextNode(fileName);
		files.appendChild(link);
		var element = document.getElementById(listName);
		element.appendChild(files);
	}
	else {
		var files = document.createElement("li");
		var node = document.createTextNode(fileName);
		files.appendChild(node);
		var element = document.getElementById(listName);
		element.appendChild(files);
	}
}

var recursion = function (json, searchParams, currentList) {
	if (searchParams.length > 0) {
		for (var y=0; y < searchParams.length; y++) {	
			if (searchParams[y].type == 'directory') {
				var newList = String(searchParams[y].name);
				createList(newList + "-li", "li", currentList);
				createClickable(newList, newList + "-li", "#");
				createList(newList, "ul", newList + "-li", "inner");
				recursion(json, searchParams[y].children, newList);
			}
			else if (searchParams[y].type == 'file') {
				var fileName = searchParams[y].name;
				var filePath = searchParams[y].path;
				addDownloads(fileName, currentList, filePath, true);
			}
		}
	}
	else {
		addDownloads("This user has not uploaded any content.", currentList, filePath, false);
	}
}

var loadJs = function () {
	var head= document.getElementsByTagName('head')[0];
	var script= document.createElement('script');
	script.src= 'slide.js';
	head.appendChild(script);
};

$(document).ready(function(){
	$.getJSON("http://192.168.105.240/users.json", function(result){
		listEntries(result);
		loadJs();
	});
})
