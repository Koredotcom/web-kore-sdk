import BaseChatTemplate from '../../baseChatTemplate';
import './insureAssistFormTemplate.scss';
import { h } from 'preact';
import { useState } from 'preact/hooks';

// Functional component for handling the Insure Assist form and button events
export function Payment(props: any) {
    const hostInstance = props.hostInstance;
    const msgData = props.msgData;

    // Object containing message data and host instance
    const messageobj = {
        msgData: msgData,
        hostInstance: hostInstance
    }

    // State to manage form data (phoneId and password)
    const [formData, setFormData] = useState({
        phoneId: '',
        password: '',
    });

    // Function to handle input changes in the form
    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Function to handle button click events
    const handleButtonEvent = (e: any) => {
        // e.preventDefault(); // Uncomment if needed

        // Logging the button event and payload
        console.log(e, 'event')
        const payload = formData;
        console.log(payload, 'payload')

        // Handle button events here (you can uncomment and add your logic here)
        // if (e.type.toLowerCase() === 'postback' || e.type.toLowerCase() === 'text') {
        //   hostInstance.sendMessage(e.value, { renderMsg: e.title });
        // } else if (e.type === 'url' || e.type === 'web_url') {
        //   let link = e.value;
        //   if (link.indexOf('http:') < 0 && link.indexOf('https:') < 0) {
        //     link = `http:///${link}`;
        //   }
        //   hostInstance.openExternalLink(link);
        // }

        // Optionally, reset the form after button click
        setFormData({
            phoneId: '',
            password: '',
        });
    };

    // Function to close the help content
    const closeHelp = (e: any) => {
        hostInstance.chatEle.querySelector('.content-info').remove();
    }

    // Check if the message payload matches the template_type
    if (msgData?.message?.[0]?.component?.payload?.template_type === 'insureAssistFormTemplate') {
        return (
            <form className="card-form content-info">
                <div className="left-data">
                    <h2 style={msgData?.message?.[0]?.component?.nameStyle}>{msgData?.message?.[0]?.component?.name}</h2>
                </div>
                <div className="right-data">
                    <figure>
                        <span className="close-avatar-content" role="contentinfo" aria-label="close" onClick={closeHelp}>
                            <img src={msgData?.message?.[0]?.component?.icon} alt="Close" />
                        </span>
                    </figure>
                </div>
                {msgData.message[0].component.payload.elements.map((ele: any, index: any) => (
                    <div key={index}>
                        <div className="login-card">
                            <label> Phone ID: </label>
                            <input
                                type="text"
                                name="phoneId"
                                value={formData.phoneId}
                                onChange={handleInputChange}
                                required
                            />

                            <div>
                                <label> Phone Pin: </label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            {msgData.message[0].component.payload?.buttons?.map((button: any, btnIndex: any) => (
                                <button
                                    key={btnIndex}
                                    style={button.buttonStyle}
                                    className="view-more-btn"
                                    onClick={() => handleButtonEvent(button)}
                                >
                                    {button?.buttonTitle}
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </form>
        );
    } else {
        return null; // Return null if the template_type doesn't match
    }
}

// Class-based template for the chat
class InsureAssistFormTemplate extends BaseChatTemplate {
    hostInstance = this; // This line might not be necessary

    // Render message using the Payment component
    renderMessage(msgData: any) {
        return this.getHTMLFromPreact(Payment, msgData, this.hostInstance);
    }
}

export default InsureAssistFormTemplate;
