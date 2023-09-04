// esmForm.js
import { h, Component } from 'preact';

class MyForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formData: {
                botInfoName: '',
                botInfoId: '',
                clientId:'',
                clientSecret:''
            },
        };
    }

    handleInputChange = (e) => {
        const { name, value } = e.target;
        this.setState((prevState) => ({
            formData: {
                ...prevState.formData,
                [name]: value,
            },
        }));
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.onSubmit(this.state.formData); // Pass the form data to the parent component
    };

    render() {
        const { formData } = this.state;

        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <h2>Configuration Form</h2>
                    <div>
                        <label htmlFor="botId">Bot Id </label>
                        <input
                            type="text"
                            id="botId"
                            name="botId"
                            value={formData.botId}
                            onChange={this.handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="clientId">Client Id:</label>
                        <input
                            type="text"
                            id="clientId"
                            name="clientId"
                            value={formData.clientId}
                            onChange={this.handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="clientSecret">clientSecret:</label>
                        <input
                            type="text"
                            id="clientSecret"
                            name="clientSecret"
                            value={formData.clientSecret}
                            onChange={this.handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="accountId">Account Id:</label>
                        <input
                            type="text"
                            id="accountId"
                            name="accountId"
                            value={formData.accountId}
                            onChange={this.handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="triggerValue">Trigger Value:</label>
                        <input
                            type="text"
                            id="triggerValue"
                            name="triggerValue"
                            value={formData.triggerValue}
                            onChange={this.handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="enviroment">Enviroment:</label>
                        <input
                            type="text"
                            id="triggerValue"
                            name="triggerValue"
                            value={formData.enviroment}
                            onChange={this.handleInputChange}
                        />
                    </div>
                    <div>
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default MyForm;
