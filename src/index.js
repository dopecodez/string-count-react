import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class OutputTable extends React.Component {
    renderTableHeader() {
        const header = ['Id', 'Word', 'Occurences']
        return header.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }

    renderTableData() {
        let count = 1;
        return this.props.output.map((data, index) => {
            let dataWithId = Object.assign({id: count}, data);
            count++;
            let col = Object.keys(dataWithId);
            return (
                <tr key={index}>
                    {col.map((val, index) => {
                        return <td key={index}>{dataWithId[col[index]]}</td>
                    })}
                </tr>
            )
        })
    }

    render() {
        return (
            <div id="tableDiv">
                <h1 id='tableHead'>Words and Occurences</h1>
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
            number: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async getMostOccuringWords() {
        try {
            let response = await fetch(`http://localhost:3004/count?url=${this.state.url}&count=${this.state.number}`, {
                method: 'GET',
                headers: new Headers({
                    'Access-Control-Allow-Origin' : '*'
                })
            });
            return response.json();
        } catch (error) {
            console.log(error);
        }
    }

    handleChange(event) {
        this.setState({number: event.target.value});
    }

    async handleSubmit(event) {
        event.preventDefault();
        let output = await this.getMostOccuringWords();
        this.renderOutputTable(output.data);
    }

    renderOutputTable(output) {
        ReactDOM.render(<OutputTable output={output} />, document.getElementById('table'));
    }

    render() {
        return (
            <div className='formDiv'>
                <form className='inputForm' onSubmit={this.handleSubmit}>
                    <b>File URL</b><br/> <input type='textbox' className='urlBox' value={this.state.url} disabled></input><br/>
                    <b>Number of words to return</b><br/> <input type='textbox' className='numberBox'
                        value={this.state.number} onChange={this.handleChange}></input>
                        <br/>
                    <input className='submitButton' type="submit" value="Submit"></input>
                </form>
            </div>
        );
    }
}

ReactDOM.render(
    <Form id="form" />,
    document.getElementById('form')
);

