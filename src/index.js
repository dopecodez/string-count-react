import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Loader from 'react-loader-spinner';

export class OutputTable extends React.Component { //Output Table component
    constructor(props) {
        super(props);    
        this.state = {
            isLoading: true, //setting initial values for state
            output: []
        }
    }

    componentDidMount() { //React hook once component renders
        this.props.getMostOccuringWords ? this.props.getMostOccuringWords().then((result) =>
            this.setState({
                output: result,
                isLoading: false
            })
        ) : this.getMostOccuringWords(); //adjusted code to get test to run - quickfix
    }

    async getMostOccuringWords() { //Function to call back end to get API response
        try {
            this.setState({ isLoading: true });
            let response = await fetch(`https://cors-anywhere.herokuapp.com/https://stormy-springs-25121.herokuapp.com/count?url=${this.props.url}&count=${this.props.number}`, {
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

    renderTableHeader() { //function to render table headers
        const header = ['Id', 'Word', 'Occurences']
        return header.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }

    renderTableData() { //function to render table data
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
                    [<h1 id='tableHead' key='header'>Words and Occurences</h1>,
                    <table id='outTable' className='outTable' key='table'>
                    <tbody>
                        <tr>{this.renderTableHeader()}</tr>
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

export class Form extends React.Component { //Form Component
    constructor(props) { //constructor
        super(props);    
        this.state = {
            url: 'https://terriblytinytales.com/test.txt', //setting initial values for state
            number: '',
            submitted: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) { //for handling changes to textbox
        this.setState({number: event.target.value});
    }

    async handleSubmit(event) { //handle submit event
        event.preventDefault(); 
        this.setState({
            submitted: true
        })// prevent default submit action
        this.renderOutputTable();
    }

    renderOutputTable() { //function to render out put table
        ReactDOM.unmountComponentAtNode(document.getElementById('table'));
        ReactDOM.render(<OutputTable url={this.state.url} number={this.state.number}/>, document.getElementById('table'));
    }

    render() {
        return (
            <div className='formDiv'>
                <form className='inputForm' onSubmit={this.handleSubmit}>
                    <b>File URL</b><br/> <input type='textbox' id='urlBox' className='urlBox' value={this.state.url} disabled></input><br/>
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
    document.getElementById('form') || document.createElement('div') //for testing purposes
);

