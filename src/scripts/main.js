import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import style from '../styles/main.scss';

const marked = require('marked');
marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textValue: "Heading\n=======\n\nSub-heading\n-----------\n \n### Another deeper heading\n \nParagraphs are separated\nby a blank line.\n\nLeave 2 spaces at the end of a line to do a  \nline break\n\nText attributes *italic*, **bold**, \n`monospace`, ~~strikethrough~~ .\n\nShopping list:\n\n  * apples\n  * oranges\n  * pears\n\nNumbered list:\n\n  1. apples\n  2. oranges\n  3. pears\n\nThe rain---not the reign---in\nSpain.\n\n *[Herman Fassett](https://freecodecamp.com/hermanfassett)*"
    }
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleOnChange(e) {
    this.setState({
      textValue: e.target.value
    });
  }

  render() {
    return <div className="container">
      <div className="header-text col-md-6 col-md-offset-3">
        <h1 className="text-center">Markdown Previewer</h1>
        <p className="text-center">With this application, you are able to type markdown 
          into the text area on the left, and the markdown will 
          then be displayed on the right with all of it's 
          markdown style properties.</p>
      </div>
      <div className="row">
        <div className="markdown col-md-6">
          <textarea className="markdown-text" onChange={this.handleOnChange} value={this.state.textValue} />
        </div>
        <div className="markdown markdown-output border col-md-6" dangerouslySetInnerHTML={{ __html: marked(this.state.textValue) }} />
      </div>
    </div>
  }
}

ReactDOM.render(<App />, document.getElementById('app'));