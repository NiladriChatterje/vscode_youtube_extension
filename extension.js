const vscode = require("vscode");
const axios = require('axios');

const options = {
	headers: {
		'X-RapidAPI-Key': '3224681278mshdf603cd43fde3cbp13a2f6jsnf3ec618192c1',
		'X-RapidAPI-Host': 'youtube138.p.rapidapi.com'
	}
};

function activate(context){
	
	console.log('A notification for checking if my extension environment is active');
	
	let disposable =vscode.commands.registerCommand('niladriYoutubeSuggestions.youtubeSuggestionsList', function () {
		vscode.window.showInformationMessage('Enjoy Searching your genres from Nil_YoutubeSuggestions!');
		
		vscode.window.showInputBox({
			placeHolder:"Enter Genre you want to search",
		}).then(async value=>{
			vscode.window.showInformationMessage(value);
			const {data:{contents}}=await axios.get(`https://youtube138.p.rapidapi.com/search/?q=${value}`,options);
			const newContent=contents.map(item=>({label:item.video.title.toLowerCase(),detail:item.video.descriptionSnippet,videoId:item.video.videoId}));
			const selection=await vscode.window.showQuickPick(newContent);
			try{
			vscode.window.showInformationMessage("You Searched for:\n"+selection.title);
			vscode.env.openExternal(`https://www.youtube.com/watch?v=${selection.videoId}`);
			}catch(e){
				vscode.window.showInformationMessage("Since it is a test project, Bugs are expected..Sorry for interruption :)");
			}
		});
		
	});

	context.subscriptions.push(disposable);
}


function deactivate() {console.log("Bye! See you again");
	vscode.window.showInformationMessage("Bye! visit again")}

module.exports = {
	activate,
	deactivate
}
