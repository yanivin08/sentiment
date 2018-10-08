var laugh = document.getElementById("imglaugh"),
	happy = document.getElementById("imghappy"),
	smile = document.getElementById("imgsmile"),
	meh = document.getElementById("imgmeh"),
	sad = document.getElementById("imgsad"),
	lonely = document.getElementById("imglonely"),
	cry = document.getElementById("imgcry");


function wordTokenize(text){
	if(text == ""){
		laugh.className = "imgInactive";
		happy.className = "imgInactive";
		smile.className = "imgInactive";
		meh.className = "imgInactive";
		sad.className = "imgInactive";
		lonely.className = "imgInactive";
		cry.className = "imgInactive";
		document.getElementById("rScore").innerText = 0;
		document.getElementById("rComparative").innerText = 0;
		document.getElementById("rWordFound").innerText = 0;
	}else{
		var arrText = text.match(/(((\w+|)(n(’|'|o|)t)|never)\s\w+|\w+)/g);
		var count = 0;
			arrText.forEach(x => x.split(" ").length == 2 ? listWords[x.split(" ")[1].toLowerCase()] != undefined ? count += -1 * listWords[x.split(" ")[1].toLowerCase()] : 0 : listWords[x.toLowerCase()] != undefined ? count += listWords[x.toLowerCase()] : 0);
		var tokenWord = arrText.filter(x => x.split(" ").length == 2 ? listWords[x.split(" ")[1].toLowerCase()] != undefined : listWords[x.toLowerCase()] != undefined);
		
		document.getElementById("rScore").innerText = count;
		document.getElementById("rComparative").innerText = count/tokenWord.length;
		document.getElementById("rWordFound").innerText = tokenWord.length;
		
		setEmoji(count/tokenWord.length);
		getSentence(text);
	}
}


function getSentence(text){
	//(Mr\.|Mrs\.|Sr\.|Doc\.|[A-Z])(\.(?!\s)|[!--/-@“”]|\s|\w)+[\.\?\!]
	//[^\.\!\?]*[\.\!\?]
	var sentence = text.match(/(Mr\.|Mrs\.|Sr\.|Doc\.|[A-Z])(\.(?!\s)|[!--/-@“”[-`{-~]|\s|\w)+[\.\?\!]/g),
		words = [];
		
	sentence.forEach(x =>{
		var tokenizeWord = x.match(/(((\w+|)(n(’|'|o|)t)|never)\s\w+|\w+)/g),
			score = 0;
			tokenizeWord.forEach(y => y.split(" ").length == 2 ? listWords[y.split(" ")[1].toLowerCase()] != undefined ? score += -1 * listWords[y.split(" ")[1].toLowerCase()] : 0 : listWords[y.toLowerCase()] != undefined ? score += listWords[y.toLowerCase()] : 0);
		var tokenWord = tokenizeWord.filter(y => y.split(" ").length == 2 ? listWords[y.split(" ")[1].toLowerCase()] != undefined : listWords[y.toLowerCase()] != undefined);
			words.push({score,tokenWord});
	});	
		
	//console.log(words);
	getAnalysis(words);
	//console.log(sentence);
}

function getAnalysis(tokenize){
	var totalScore = 0;
	console.log(tokenize);
	var content = ""
	
	tokenize.forEach((x,i) => {
		var ind = i + 1;
		content += "<div class=\"list\">" +
						"<h3>Sentence " + ind + "</h3>" +
						"<span><b>Score: </b>"+ x.score +"</span>" +
						"</br>" +
						"<span><b> Words Found:</b>" + x.tokenWord.join(", ") + "</span>" +
					"</div>"
		//console.log(x.score/x.tokenWord.length);
	});
	
	document.getElementById("analysisViewer").innerHTML = content;
	
	//totalScore += x.score / x.tokenWord.length);
	
	/*console.log(totalScore);
	console.log(totalScore/tokenize.length);*/
	
}


function setEmoji(score){
	
	if(score == -5){
			laugh.className = "imgInactive";
			happy.className = "imgInactive";
			smile.className = "imgInactive";
			meh.className = "imgInactive";
			sad.className = "imgInactive";
			lonely.className = "imgInactive";
			cry.className = "imgActive";
	}else if(score > -5 && score < -3){
			laugh.className = "imgInactive";
			happy.className = "imgInactive";
			smile.className = "imgInactive";
			meh.className = "imgInactive";
			sad.className = "imgInactive";
			lonely.className = "imgActive";
			cry.className = "imgInactive";
	}else if(score >= -3 && score < 0){
			laugh.className = "imgInactive";
			happy.className = "imgInactive";
			smile.className = "imgInactive";
			meh.className = "imgInactive";
			sad.className = "imgActive";
			lonely.className = "imgInactive";
			cry.className = "imgInactive";		
	}else if(score == 0){
			laugh.className = "imgInactive";
			happy.className = "imgInactive";
			smile.className = "imgInactive";
			meh.className = "imgActive";
			sad.className = "imgInactive";
			lonely.className = "imgInactive";
			cry.className = "imgInactive";
	}else if(score > 0 && score < 3){
			laugh.className = "imgInactive";
			happy.className = "imgInactive";
			smile.className = "imgActive";
			meh.className = "imgInactive";
			sad.className = "imgInactive";
			lonely.className = "imgInactive";
			cry.className = "imgInactive";
	}else if(score >= 3 && score < 5){
			laugh.className = "imgInactive";
			happy.className = "imgActive";
			smile.className = "imgInactive";
			meh.className = "imgInactive";
			sad.className = "imgInactive";
			lonely.className = "imgInactive";
			cry.className = "imgInactive";
	}else if(score == 5){
			laugh.className = "imgActive";
			happy.className = "imgInactive";
			smile.className = "imgInactive";
			meh.className = "imgInactive";
			sad.className = "imgInactive";
			lonely.className = "imgInactive";
			cry.className = "imgInactive";
	}
}

function showDashboard(elem){
	if(elem.className == "hide"){
		elem.className = "show";
	}else{
		elem.className = "hide";
	}
}