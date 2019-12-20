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
        return this.props.output.map((data, index) => {
            let col = Object.keys(data);
            return (
                <tr key={data.id}>
                    {col.map((val, index) => {
                        return <td key={index}>{data[col[index]]}</td>
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
            return await fetch(`/endpoint?url=${this.state.url}&number=${this.state}`);
            // return [
            //     { id: 1 ,name: 'chakka', count: 10 },
            //     { id: 2 ,name: 'vaazha', count: 15 }
            // ]
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
        this.renderOutputTable(output);
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

