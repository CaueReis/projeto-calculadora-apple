import React, { Component } from "react";
import './Calculator.css'
import Button from "../components/Button";
import Display from "../components/Display";

const initialState = {
    displayValue: '0',
    clearDisplay: false,
    operation: null,
    values: [0, 0],
    current: 0
}

export default class Calculator extends Component {

    state = { ...initialState }

    constructor(props) {
        super(props)
        this.clearMemory = this.clearMemory.bind(this)
        this.setOperation = this.setOperation.bind(this)
        this.addDigit = this.addDigit.bind(this)
    }


    clearMemory() {
        this.setState({ ...initialState })
    }

    setOperation(operation) {
        if (this.state.displayValue === 'Erro') {
            this.clearMemory();
            return;
        }
    
        if (this.state.current === 0) {
            this.setState({ operation, current: 1, clearDisplay: true })
        } else {
            const equals = operation === '='
            const currentOperation = this.state.operation
            
            const calculate = (n1, op, n2) => {
                switch(op) {
                    case '+': return n1 + n2;
                    case '-': return n1 - n2;
                    case '*': return n1 * n2;
                    case '/': return n2 === 0 ? 'Erro' : n1 / n2;
                    default: return n2;
                }
            }
            
            const values = [...this.state.values]
            const result = calculate(values[0], currentOperation, values[1])
            
            if (result === 'Erro') {
                this.setState({ displayValue: 'Erro', clearDisplay: true });
                this.clearMemory()
                return;
            }
    
            values[0] = result;
            values[1] = 0;
    
            // Formatação inteligente do resultado
            const displayValue = Number.isInteger(result) 
                ? result.toString() 
                : parseFloat(result.toFixed(8)).toString();
    
            this.setState({
                displayValue,
                operation: equals ? null : operation,
                current: equals ? 0 : 1,
                clearDisplay: !equals, 
                values
            })
        }
    }

    addDigit(n) {
        if(n === '.' && this.state.displayValue.includes('.')) {
            return
        }

        const clearDisplay = this.state.displayValue === '0'
            || this.state.clearDisplay
        const currentValue = clearDisplay ? '' : this.state.displayValue
        const displayValue = currentValue + n
        this.setState({ displayValue, clearDisplay: false })

        if(n !== '.') {
            const i = this.state.current
            const newValue = parseFloat(displayValue)
            const values = [...this.state.values]
            values[i] = newValue
            this.setState({ values })
        }
    }

    render() {
        return (
            <div className="calculator">
                <Display value={this.state.displayValue}/>
                <Button label="AC" click={this.clearMemory} triple></Button>
                <Button label="/" click={this.setOperation} operation></Button>
                <Button label="7" click={this.addDigit}></Button>
                <Button label="8" click={this.addDigit}></Button>
                <Button label="9" click={this.addDigit}></Button>
                <Button label="*" click={this.setOperation} operation></Button>
                <Button label="4" click={this.addDigit}></Button>
                <Button label="5" click={this.addDigit}></Button>
                <Button label="6" click={this.addDigit}></Button>
                <Button label="-" click={this.setOperation} operation></Button>
                <Button label="1" click={this.addDigit}></Button>
                <Button label="2" click={this.addDigit}></Button>
                <Button label="3" click={this.addDigit}></Button>
                <Button label="+" click={this.setOperation} operation></Button>
                <Button label="0" click={this.addDigit} double></Button>
                <Button label="." click={this.addDigit}></Button>
                <Button label="=" click={this.setOperation} operation></Button>
            </div>
        )
    }
}