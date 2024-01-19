import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    console.log('Extension "Prax Box Shadow" is now active!');

  // Register the command to open the custom view
  context.subscriptions.push(
    vscode.commands.registerCommand('BoxShadow.Show', () => {
      ShowPanel.createOrShow(context.extensionUri);
    })
  );
}

// Custom view class
class ShowPanel {
  public static currentPanel: ShowPanel | undefined;
  public static readonly viewType = 'BoxShadow';

  private readonly _panel: vscode.WebviewPanel;
  private readonly _extensionUri: vscode.Uri;
  private readonly _disposables: vscode.Disposable[] = [];

  public static createOrShow(extensionUri: vscode.Uri) {
    const column = vscode.window.activeTextEditor
      ? vscode.window.activeTextEditor.viewColumn
      : undefined;

    // If the panel already exists, show it
    if (ShowPanel.currentPanel) {
      ShowPanel.currentPanel._panel.reveal(column);
      return;
    }

    // Otherwise, create a new panel
    const panel = vscode.window.createWebviewPanel(
      ShowPanel.viewType,
      'Prax Box Shadow',
      column || vscode.ViewColumn.One,
      {
        enableScripts: true // Allow scripts in the webview
      }
    );

    ShowPanel.currentPanel = new ShowPanel(panel, extensionUri);
  }

  private constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
    this._panel = panel;
    this._extensionUri = extensionUri;

    // Set the HTML content for the webview
    this._update();

    // Handle panel disposal
    this._panel.onDidDispose(() => this.dispose(), null, this._disposables);
  }

  public dispose() {
    ShowPanel.currentPanel = undefined;
    this._panel.dispose();

    // Clean up the disposables
    while (this._disposables.length) {
      const disposable = this._disposables.pop();
      if (disposable) {
        disposable.dispose();
      }
    }
  }

  private _update() {
    const webview = this._panel.webview;
    this._panel.webview.html = this._getHtmlForWebview(webview);
  }

  private _getHtmlForWebview(webview: vscode.Webview) {
    // Load a local HTML file or use a template literal
    var scriptt = `let element = document.getElementById("element");
    let code = document.getElementById("code");
    let inputs = document.querySelectorAll(".sliders input");
    let copyBtn = document.getElementById("copyBtn");
    
    inputs.forEach((inp) => inp.addEventListener("input", generateBoxShadow));
    
    function generateBoxShadow() {
      copyBtn.textContent = "Copy";
      copyBtn.style.backgroundColor = "rgb(115, 255, 35)";
      let h_shadow = document.getElementById("h-shadow").value;
      let v_shadow = document.getElementById("v-shadow").value;
      let blur_radius = document.getElementById("blur-radius").value;
      let spread_radius = document.getElementById("spread-radius").value;
      let shadow_color = document.getElementById("shadow-color").value;
      let shadow_color_opacity = document.getElementById(
        "shadow-color-opacity"
      ).value;
      let inset_shadow = document.getElementById("shadow-inset").checked;
    
      let boxShadow = inset_shadow
        ? \`inset \${h_shadow}px \${v_shadow}px \${blur_radius}px \${spread_radius}px \${hexToRGBA(
            shadow_color,
            shadow_color_opacity
          )}\`
        : \`\${h_shadow}px \${v_shadow}px \${blur_radius}px \${spread_radius}px \${hexToRGBA(
            shadow_color,
            shadow_color_opacity
          )}\`;
    
      element.style.boxShadow = boxShadow;
      code.textContent = \`box-shadow: \${boxShadow};\`;
    }
    
    function hexToRGBA(shadow_color, shadow_color_opacity) {
      let r = parseInt(shadow_color.substr(1, 2), 16);
      let g = parseInt(shadow_color.substr(3, 2), 16);
      let b = parseInt(shadow_color.substr(5, 2), 16);
      return \`rgba(\${r},\${g},\${b},\${shadow_color_opacity})\`;
    }
    
    copyBtn.addEventListener("click", copyCode);
    function copyCode() {
      code.setAttribute("spellcheck", "false");
      copyBtn.textContent = "Copied";
      copyBtn.style.backgroundColor = "rgb(41,194,20)";
      code.select();
      document.execCommand("copy");
    }
    
    window.onload = generateBoxShadow();
    `; 
    return `
    <html>
    <head>
      <title>Box Shadow Generator</title>
      <style>
      
  @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,500;0,600;0,700;0,800;1,400&display=swap');


  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins',sans-serif;
  }
  
  body{
    display: flex;
    height: 540px;
    width: 480px;
    background-color: #030d22;
  }
  
  .container{
    height: 100%;
    width: 100%;
    background-color: #27234b;
    padding: 20px;
    position: absolute;
    transform: translate(-50%,-50%);
    left:50%;
    top: 50%;
    width: 100vmin;
    border-radius: 10px;
    box-shadow: 0 15px 30px rgba(2,42,83,0.2);
  }
  
  .result{
    background-color: #fff;
    padding: 100px;
    border: 1px solid black;
    border-radius: 5px;
    margin-bottom: 10px;
  }
  
  .element{
    width:50px;
    height:50px;
    position: relative;
    margin-top: auto;
    background-color: #07abcf;
  }
  
  .sliders{
  display: grid;
  grid-template-columns: 6fr 6fr;
  gap:15px 10px;
  }
  
  .slider-wrapper{
    display: flex;
    color: #fff;
    flex-direction: column;
    justify-content: space-between;
  }
  
  input[type='range']{
    width: 100%;
    color: #fff;
    height: 8px;
  }
  
  .input-wrapper{
    color: #fff;
  }
  
  
  
  .code-wrapper{
    display: grid;
    grid-template-columns: 10fr 2fr;
    gap: 5px;
    margin-top: 30px;
    
  }
  
  .code-wrapper button{
    background-color:rgb(115, 255, 35) ;
    color: #474747;
    border-radius: 5px;
  }
  
  textarea{
    background-color: #181e29;
    resize: none;
    padding: 5px;
    color: #fff;
    border: 1px solid black;
    border-radius: 3px;
   
  }
  
  #copyBtn{
    cursor: pointer;
    color: #000000;
  }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="result">
          <div class="element" id="element"></div>
        </div>
        <div class="sliders">
          <div class="slider-wrapper">
            <label for="h-shadow">Horizontal Shadow:</label>
            <input type="range" name="" id="h-shadow" max="100" min="-100" value="0" style="width: 100%; background-color: #ffffff; border: none; outline: none;">
          </div>
          <div class="slider-wrapper">
            <label for="v-shadow">Vertical Shadow:</label>
            <input type="range" name="" id="v-shadow" max="100" min="-100" value="0">
          </div>
          <div class="slider-wrapper">
            <label for="blur-radius">Blur Radius:</label>
            <input type="range" name="" id="blur-radius" max="100" min="0" value="0">
          </div>
          <div class="slider-wrapper">
            <label for="spread-radius">Spread Radius:</label>
            <input type="range" name="" id="spread-radius" max="50" min="-50" value="0">
          </div>
          <div class="slider-wrapper">
            <label for="shadow-color">Shadow Color:</label>
            <input type="color"  id="shadow-color" value="#000000">
          </div>
          <div class="slider-wrapper">
            <label for="shadow-color-opacity">Shadow Color Opacity:</label>
            <input type="range" name="" id="shadow-color-opacity" max="1" min="0" step="0.1" value="1">
          </div>
          <div class="input-wrapper">
            <label for="shadow-inset">Inset Shadow:</label>
            <input type="checkbox" name="" id="shadow-inset" >
          </div>
        </div>
        <div class="code-wrapper" >
          <textarea  rows="2" id="code" readonly></textarea>
          <button id="copyBtn">Copy</button>
        </div>
      </div>
      <script>
      ${scriptt};
      </script>
    </body>
    </html>
    `;
  }
}

export function deactivate() {}
