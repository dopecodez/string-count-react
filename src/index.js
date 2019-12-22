import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Loader from 'react-loader-spinner';

class OutputTable extends React.Component {
    constructor(props) {
        super(props);    
        this.state = {
            isLoading: true,
            output: [],
        }
    }

    componentDidMount() {
        this.getMostOccuringWords();
    }

    async getMostOccuringWords() {
        try {
            this.setState({ isLoading: true });
            let response = await fetch(`http://localhost:3004/count?url=${this.props.url}&count=${this.props.number}`, {
                method: 'GET',
                headers: new Headers({
                    'Access-Control-Allow-Origin': '*'
                })
            });
            let result = await response.json();
            result = result.data;            
            this.setState({
                output: result,
                isLoading: false
            });
        } catch (error) {
            this.setState({ isLoading: false });
            console.log(error);
        }
    }

    renderTableHeader() {
        const header = ['Id', 'Word', 'Occurences']
        return header.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }

    renderTableData() {
        let count = 1;
        return this.state.output.map((data, index) => {
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
                {
                    !this.state.isLoading ?
                    [<h1 id='tableHead'>Words and Occurences</h1>,
                    <table id='outTable'>
                    <tbody>
                        <tr>{this.renderTableHeader()}</tr>,
                        {this.renderTableData()}
                    </tbody>
                    </table>]
                    : <Loader
                    type="Puff"
                    color="#00BFFF"
                    height={300}
                    width={200}
                    timeout={3000} />
                }
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

    handleChange(event) {
        this.setState({number: event.target.value});
    }

    async handleSubmit(event) {
        event.preventDefault();
        this.renderOutputTable();
    }

    renderOutputTable() {
        ReactDOM.unmountComponentAtNode(document.getElementById('table'));
        ReactDOM.render(<OutputTable url={this.state.url} number={this.state.number}/>, document.getElementById('table'));
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

