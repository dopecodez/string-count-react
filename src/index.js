import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class OutputTable extends React.Component {
    renderTableHeader() {
        const header = ['Id', 'Word', 'Count']
        return header.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }

    renderTableData() {
        return this.props.output.map((data, index) => {
           let col = Object.keys(data);
           return (
              <tr key={data.word}>
                 {col.map((val, index) => {
                    return <td key={index}>{data[col[index]]}</td>
                 })}
              </tr>
           )
        })
     }

    render() {
        return (
           <div>
              <h1 id='tableHead'>Number of most occuring words</h1>
              <table id='outTable'>
                 <tbody>
                    <tr>{this.renderTableHeader()}</tr>
                    {this.renderTableData()}
                 </tbody>
              </table>
           </div>
        )
     }
}

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            url: 'https://terriblytinytales.com/test.txt',
            number: 'Enter no of recurring word',
            renderAgain: true
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    shouldComponentUpdate(){
        console.log(`ithil vanna ${this.state.renderAgain}`)
        return this.state.renderAgain ? true : false;
    }

    async getMostOccuringWords() {
        try {
            // return await fetch(`/endpoint?url=${this.state.url}&number=${this.state}`);
            return [
                {name:'chakka', count:10},
                {name:'vaazha', count:15}
            ]
        } catch (error) {
            console.log(error);
        }
    }

    handleChange(event) {
        this.setState({ number: event.target.value,
        renderAgain: true });
    }

    async handleSubmit(event) {
        let output = await this.getMostOccuringWords();
        this.setState({
            renderAgain :false
        })
        this.renderOutputTable(output);
        event.preventDefault();
    }

    renderOutputTable(output){
        ReactDOM.unmountComponentAtNode(document.getElementById('formDiv'))
        ReactDOM.render(<OutputTable output={output} />, document.getElementById('table'));
    }

    render() {
        return (
            <div>
                <div id="formDiv" >
                    <form className='textDiv' onSubmit={this.handleSubmit}>
                        File URL: <input type='textbox' className='textbox' value={this.state.url} readOnly></input>
                        Number of most reccurring words : <input type='textbox' className='textbox'
                            value={this.state.number} onChange={this.handleChange}></input>
                        <input type="submit" value="Submit"></input>
                    </form>
                </div>
                <div id="table"> </div>
            </div>
        );
    }
}

ReactDOM.render(
    <Form id="form"/>,
    document.getElementById('root')
);

