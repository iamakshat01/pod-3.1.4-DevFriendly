const vscode = require("vscode");
const path = require("path");
const redditImageFetcher = require('reddit-image-fetcher');

module.exports = {
  show,
};

let extensionContext;
let myView;

async function show(context) {
  extensionContext = context;
  const imgSrc = await getImg();
  myView = vscode.window.createWebviewPanel(
    "memesPanel",
    "Meme's Page",
    vscode.ViewColumn.One
  );

  myView.webview.html = getHtml(imgSrc);
}

function getHtml(imgSrc) {
  const stylesSrc = getUri("style.css");
 
  
  return `<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<title>Meme's Page</title>
				<link rel="stylesheet" href="${stylesSrc}"/>
			</head>
			<body>
				<h1>Meme's Corner</h1>
				<img src="${imgSrc}" alt="meme"/>
			</body>
			</html>`;
}

/**
 * Get the webview-compliant URI for the main stylesheet. Using the "file:" protocol is not supported.
 */
function getUri(filename) {
  const onDiskPath = vscode.Uri.file(
    path.join(extensionContext.extensionPath, "media", filename)
  );
  const src = myView.webview.asWebviewUri(onDiskPath);
  return src;
}

async function getImg() {
  const meme = await redditImageFetcher.fetch({
    type: 'meme',
    addSubreddit: ['funny'], 
    removeSubreddit: ['dankmemes','adult']
  });
  return meme[0].image;
}