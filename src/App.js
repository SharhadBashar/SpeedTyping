import React from 'react';
import getWord from './API/Word';
import key from './API/Key';

class App extends React.Component {
    state = {
        value: '',
        word: null,
        score: 0,
        time: 300
    }
    
    handleSubmit = (event) => {
        event.preventDefault();
        if (this.state.word === this.state.value) {
            this.setState({score: this.state.score + 1});
            this.setState({value: ''})
            this.getWord();
        }
    }

    getWord = () => {
        getWord.get(`/word?key=${key}&number=1`)
        .then(response => {
            this.setState({word: response.data[0]})
        });
    }

    startTimer = () => {
        var timer = setInterval(() => {
            this.setState({time: this.state.time - 1})
            if (this.state.time < 0) {
                alert(`Times up\nYour score is ${this.state.score}`);
                clearInterval(timer);
            }   
        }, 1000)
    }

    componentDidMount() {
        this.getWord();
    }

    render() {
        return (
            <div className = "ui container">
                <div className = "ui segment">
                    <p>The Word: {this.state.word}</p>
                    <p>Time remaining: {this.state.time >= 0 ? this.state.time + ' s' : <a href=".">Restart</a>}</p>
                    <form className = "ui form" onSubmit = {this.handleSubmit}>
                        <div className = "ui field">
                            <label>Type the word you see above: </label>
                            <input 
                                type = "text" 
                                disabled = {this.state.time <= 0}
                                value = {this.state.value} 
                                onClick = {this.startTimer}
                                onChange = {(e) => this.setState({value: e.target.value})}
                            />
                        </div>
                        <button type = "submit">Submit</button>
                    </form>
                    <br></br>
                    Score: {this.state.score}
                </div>
            </div>
        )
    }
}

export default App