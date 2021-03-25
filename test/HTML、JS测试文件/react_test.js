class CustomForm extends Component {
    handleSubmit = () => {
        console.log("Input Value: ", this.input.value)
    }
    render() {
        return (

            <input
                type='text'
                ref={(input) => this.input = input} />
        )
    }
}
