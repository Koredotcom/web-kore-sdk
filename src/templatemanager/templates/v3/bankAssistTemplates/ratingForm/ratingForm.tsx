import BaseChatTemplate from '../../baseChatTemplate';
import './ratingForm.css';
import { h, FunctionalComponent } from 'preact';
import { useState } from 'preact/hooks';
import { getHTML } from '../../../../base/domManager';
import IconsManager from '../../../../base/iconsManager';


interface Experience {
    id: string;
    value: string;
    // Add other properties if needed
  }
  
  
  

export function feedback(props: any) {
    const hostInstance = props.hostInstance;
    const msgData = props.msgData;
    const messageObj = {
        msgData: msgData,
        hostInstance: hostInstance
    }

    const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);
    const [selectedFeedbackItems, setSelectedFeedbackItems] = useState<string[]>([]);

    const handleRadioChange = (experience: any) => {
        setSelectedExperience(experience);
        const feedbackContent = document.querySelectorAll('.bankingFeedBackTemplate-feedback-content');
        // Iterate over the NodeList and remove the 'hide' class from each element
        feedbackContent.forEach((element) => {
            element.classList.remove('hide');
            element.classList.add('fadeInAnimation'); // Add the class to apply the animation
            scrollToBottom();
        });
    };
    const scrollToBottom = () => {
        const elementsWithClassName = document.querySelectorAll('.bankingFeedBackTemplate-experience-content');

        // Check if there are elements with the specified class name
        if (elementsWithClassName.length > 0) {
            // Get the last element from the NodeList
            const lastElement = elementsWithClassName[elementsWithClassName.length - 1];

            // Now you can perform operations on the last element
            lastElement.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
        }
    };

    const handleCheckboxChange = (event: Event, feedbackValue: string) => {
        const isChecked = (event.target as HTMLInputElement).checked;
        if (isChecked) {
        setSelectedFeedbackItems((prevItems) => [...prevItems, feedbackValue]);
        } else {
        setSelectedFeedbackItems((prevItems) => prevItems.filter((item) => item !== feedbackValue));
        }
    };  

    const disableButtons = () => {
        // Disable the radio buttons and set cursor style for associated labels
        const radioButtons = document.querySelectorAll('.checkInput[type="radio"]');
        radioButtons.forEach((radioButton) => {
            (radioButton as HTMLInputElement).disabled = true;

            const labelForRadioButton = document.querySelector(`label[for="${radioButton.id}"]`) as HTMLLabelElement | null;
            if (labelForRadioButton) {
            labelForRadioButton.style.cursor = 'default'; // Set cursor style for the label
            }
        });

        // Disable the checkboxes and set cursor style for associated labels
        const checkboxes = document.querySelectorAll('.checkInput[type="checkbox"]');
        checkboxes.forEach((checkbox) => {
            (checkbox as HTMLInputElement).disabled = true;

            const labelForCheckbox = document.querySelector(`label[for="${checkbox.id}"]`) as HTMLLabelElement | null;
            if (labelForCheckbox) {
            labelForCheckbox.style.cursor = 'default'; // Set cursor style for the label
            }
        });

        const elementsWithClassName = document.getElementsByClassName('feedback-suggestionInput');

        // Check if there are elements with the specified class name
        if (elementsWithClassName.length > 0) {
            // Get the last element from the collection
            const lastElement = elementsWithClassName[elementsWithClassName.length - 1] as HTMLTextAreaElement;

            // Now you can use lastElement as the last element with the specified class
            lastElement.disabled = true;
            lastElement.style.cursor = 'default'; // Set cursor style
        }

        // Disable the buttons and set cursor style
        const buttons = document.querySelectorAll('.custom-form-button');
        buttons.forEach((button) => {
            const buttonElement = button as HTMLButtonElement;
            buttonElement.disabled = true;
            buttonElement.style.cursor = 'default'; // Set cursor style for the button
        });
    }

    const handleSubmit = (btnType: string) => {
        
        if (btnType === 'confirm') {
            // Send feedback checkbox
            const selectedFeedback = {
              selectedFeedback: selectedFeedbackItems.map(value => ({ id: value, value }))
            };
        
            // Send radio button
            const selectedExperienceItem = {
              selectedExperience: selectedExperience
            };
        
            // Send user suggestion
            const textareaValue = {
              userSuggestion: (document.getElementById('bankingSuggestionInput') as HTMLTextAreaElement)?.value
            };
        
            // Combine the three objects into a single message body
            const messageBody = {
              ...selectedFeedback,
              ...selectedExperienceItem,
              ...textareaValue
            };
        
            let clientMessageId = new Date().getTime();
            let messageToBot: any = {
              clientMessageId: clientMessageId,
              resourceid: '/bot.message'
            };
        
            // Check if messageBody is not empty before adding it to the messageToBot
            if (Object.keys(messageBody).length > 0) {
                messageToBot.message = { body: JSON.stringify(messageBody) };
                hostInstance.bot.sendMessage(messageToBot);
            }
        }
        if (btnType === 'cancel') {
            hostInstance.sendMessage(`Body: Cancel`,{renderMsg: `Cancel`});
        }

        disableButtons();
      };

    if (msgData?.message?.[0]?.component?.payload?.template_type == 'bankingFeedbackTemplate') {
        const buttons = msgData.message[0].component.payload?.buttons;
        const feedbackList = msgData.message[0].component.payload?.feedbackList;
        return (
            <div className="list-view-action-template-wrapper">
                <div className="list-view-heading"> 
                    {msgData.message[0].component.payload.heading &&
                        msgData.message[0].component.payload.heading
                    }
                </div>
                <div className="bankingFeedBackTemplate-experience-content">
                
                    <div className="bankingFeedBackTemplate-content-experience">
                        {msgData.message[0].component.payload?.experienceContent?.map((experience:any) => (
                        <div className="content-list-view" key={experience.id}>
                            <input
                            name = "feedback"
                            className="checkInput"
                            type="radio"
                            value={experience.value}
                            id={`${experience.id}${msgData.messageId}`}
                            onChange={() => handleRadioChange(experience)}
                            checked={selectedExperience?.id === experience.id}
                            />
                             <label htmlFor={`${experience.id}${msgData.messageId}`} className="checkInput-label">
                                {experience.id === 'ExtremelySatisfied' && (
                                    <span className="image-container">
                                        <img
                                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAXCAYAAAAP6L+eAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAIvSURBVHgBrVQ9bxNBEH2zZxMpCZa7FFBcAKHEwsKuKSANFBQ5p0YCd4iG/AEEESWNaYAqgCjocJo0ocBpIJ0PF4AspDgSFHSWZYsP33rYXeec2Hux7DhPuru9nXlvZ3dmBxgR/HXB1c+o/nSkUDWVAYtlNfRAlOk3sg/GNjgo0OK32kjCXHaTmD5dUJbbGA2vINtrgwuQHaVTVLMuxgGjhrbM0aUvviVszs+Jl9UwieOhjn9yKRQXPVER/zCBKAw37hS5nEn2hJXoo7G3HwWtMSMfGkkTbUSiHr9oY/7Gb2x9lBZ/65PE5ZU/xicCqzpqgZjjDVp+/GKsFwMzfrn/PYz1dwEara6P9rUwHawKMC1jCBpNe+7nIbFGK4JEdFVYxa9wdo6QOtctmOtXhMXL52KW3wBc4mqaoyx6i40mI3VeRJmx81kidUEgMRN9eY8UnhTqjHkPJw7yhX7hpNHhvRhEp7TfxfpQeNM22c+vxK0E7VQ6eG/qm/Hg7ilbWGCDeFddwUDuKp++66wTd/PeX5NEnaDEbDgPU8O6It4+mTLfflANLZEVNO/XVehPBxdNzBI2n00h7zk4M9etErOIWuD+rRg2n0eJmk28pqxfP+hu1bRuQtcwEcini5UsEDYhDenkzTaOL1qDFLnwrydMi742LKlhCeNjW3ONRqgX5aWO5Y4yqfbHLoYGSXVIrNFCpWCZhvH4e9pTRM/0WSa3y2Cd7BIcbKAZ83Wiorj/AYk12VmZ8xKXAAAAAElFTkSuQmCC"
                                            alt="Emoji"
                                        />
                                    </span>
                                )}
                                {experience.id === 'Satisfied' && (
                                    <span className="image-container">
                                        <img
                                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAXCAYAAAAP6L+eAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAALRSURBVHgBrVVNaBNBFP5mf9KgsYYebLRFQgu2Damk4EGUQr30IB6iNy9qvHisPQh6anr1B9JjL1p/QChi0pPgxYIeigeb/phapbqHglWwhpgUmyb7nJltYpLNpgH9YHZm38z75r1v384ATYJWev2iNbueORLN+73Y5xnhK4b4sqHqSUryZwJm4SHr+2A0TUyrwTEwdp0PvdgLRFHWszzekFimqmjxzBZCz14WkVozpT3QrWD4lIrOdocEiSVh5s9XRq+U50Tqiv6KRypJ5xZNBLoUnDyuyA3ux3fgCEYh4UvzIa8tYlrtn+Jvl9Ek1r+RbIFuhtb9ZZoYO7Y0WiaWEqj6l1rnize2kckRnt5pKTtnsoTBS5Zd2EQvspqMuqw1RTrD+pZnLSkUPVpLOrdgSjlSa1TWWqDVwzA5pu+OgYXnbkTC6l9HlY2JTtsVxCaBSLGEznbFJkOpz2SB4dNa5XRIaK3RSnAIdSAie/3IjfUN01YNokImnhTQwe11KsULPe9n9LH/Cn95gP+KYkRxnNvU8S/QQEjX/f8ShwHfb+Dsd6Q+k5REyCMqYE+QmtZgqkmoRfukpwBsuJFaUHDt3pbUU5TarxwQuaDjamUl1GKnaGisL2nQp/40j7z6XMhbkQUO6fIjliAqIfaY/4XZFmtzG5jBgqmk5W3SRNXc/EGL2MXr18OzyXOtNjjR+wPofNeOu74uYPoI8MNl5zUhuawCdGkxFIojMmpBKpq0c+I3bcBXd7VzG4/Yl6sTMTNASkKOSiZ+VoSRU+OY7oAjjm4Bg5tAi+m0IsLPiikxKH9i1rOUwFvvBBohqzmTEhsvkVYRSxieBBrBt223MZaGyUZZz2K00lxN7NaScqETXDVlSZhBQRlgvYsx2361Brp1Lsyvmzjq4cTPGQQzBhR+Y+TUBBtIOgZR/867GfbzKudR8JsBPAOiWdHY7ReNparAH6xzDy3wDyJVAAAAAElFTkSuQmCC"
                                            alt="Emoji"
                                        />
                                    </span>
                                )}
                                {experience.id === 'Neutral' && (
                                    <span className="image-container">
                                        <img
                                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAXCAYAAAAP6L+eAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAI7SURBVHgBtVQxUBNBFH3/7qIzoEysaJjxxnEUItGko1MKaSwISmPhKFZaSUPpQGwpTGdrZ+MM1mmERrTKmUI0OiaMFNplGDKjJJvv342XwN0lJqBvZu/+7dv/9v+//xboE7w17urR73rqKlRKpMDWrJgZEKUOk+yBsQFu5GjiY6UvYS64cQydzglzF/3hOVQ9G9yAwlHaazLrYhAwKqirOZr84IWETf3sWEHMOI6GKvbVtC9utUWt2OtjiML4xuw1LqTibWERXRk4/ShojWG1bMw/JSgH17wtNs176rIVqaH5kVOExLmIxqrZZyw4diY4v/ODcXvplxn+BodE3zcNd+Phz0geQ41FC0yzwfmX+cYBERUWLqqevPT9VSvU/AKdoo+x0XAp/sYLXEd6MNQJ89dtE9XuntT4SthR8/k3rUjnZ+xIYeJSkvEfIDXmbfxzkOfoh1hnuy3Rp/5OxrfvrdMfGyVJ3zHvrmjyNvHnS4tyiz0Ncrs1xtJqHflNFemr6/zoTqzbBgvEZfkFG6p88BD9PtaHd2vGwlTSQuK8Ld+MHYk8v9nKQuPF6smAOFVQs9Jmhj9Nyi9Nyz715Nm+aan7Nx2MDHdPWff71tcmHj840ZlkytLF4krndisl9SV0DccCeXShmNZWp0mVvWDSOLpoBcqa87/awjThaWJazHUMjg3tazR8vahVUpZ7QknN2UXPIKkKhSyNF3Mhqpcff0lmxDFj7lkmt+XBVenTddh4hT3Ho7RXjfL9DQOz2xYkUCcSAAAAAElFTkSuQmCC"
                                            alt="Emoji"
                                        />
                                    </span>
                                )}
                                {experience.id === 'Unsatisfied' && (
                                    <span className="image-container">
                                        <img
                                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAXCAYAAAAP6L+eAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAMTSURBVHgBpVRbSFRBGP7mnLOp62VXhG4UbQlporZBF5UCCzLCKK1egkp8CunFHoReIi2iBwv0IfTJCwY9pK1IUdhDGxT55mZlYqVrVChiratrumfPmWZGd927W30wZ+bM/P83/3zz/wMkCPox18JbovYkJtFonhVUOsWGFSDEGrpIHaB4CeprIrtGnAkR00GLGcb0JrZShcTQAU1tCN+AREYp29isBX8DCidUrZLkDzsiiIV+smGQDc34N7jg1Q77yaUAqWR4EU7q9lB8m6IRDDHmzTDINjpoNQeIGWl9+PG5Y3nNEvpfaxHE3f0aztUtRZJzjlTtuhiuSDAevD4wpKPujhcZacCDxiRkpIbesXueCmK3Z3l9y4awHPDImRIUuSI4Sk7IncpKpKikHBlpBE9aknG0WMKhi4vCJyR6o6+W0NF8pi0p5f/lNYtIZ0615xUU7ZaRCIa/6LjRqmJuHmyzJP+0ndBPBb9YugjB+aW02zQMvNVEBFyKvB0Sqk8bWE9WiCh6nqtCLjcj4zKcKVPECYNO55T8pEKKSYq+VymYy7qA7GO3se9gEfgB2x6pgQjbbCo+MPK9bI3bkJ1X0dKdLDYMgoVJURAyM6tuxr2vT8X4xPprKEzviyrBkPskHk/fFOPL247DpPwIWWcR0wkkouVY9JyODuKQ+Gcts6Yun7hYngFtvRrWhE4nJEi6PZ4Nj7L5/qrGzV2quOS4kNDL8tjQwSrGFcuGp1PJOiPumjaJVuBNiVqNqyBOViC9EtnucLHQmxEn4rNGE6zrUkSrSs0UFRcTFJ1kj8Ml3gqS876edfZodkWFMlr1afQszIrW6JtiORureIiD5AxxLiiBOU2uhqzzF84SbJqXTfCwQ8Hw5zlRypc2KqIQfroRKYEmVfr/AsQNI2+wP6vviinpeztWns9RzxGR1wJbgRnWzSyxD2uT3twA5dhCsWt84UDDu5lS9peyvM2tZ7qN9aXBFfhfYImga7RTUX+TajkZVkJ1K6WsFAnMBMTCbSgfx9/QKexAnczXxXxZLzk1L7H/AQh3TytinmZgAAAAAElFTkSuQmCC"
                                            alt="Emoji"
                                        />
                                    </span>
                                )}
                                {experience.id === 'VeryUnsatisfied' && (
                                    <span className="image-container">
                                        <img
                                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAXCAYAAAAP6L+eAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAJkSURBVHgBrVXPaxNBFP4mP9q0ak1QelFhPSi0emhu3mwP/iARugXvtv0HkouQCtIUL1UPxn9AvXmpNAcj4qV601P3IBW8ZIWAUIXGSEtqmjzfm2aTTbIJackHm8zMm/nem2++2QX6BKVuG/L0O191JXoQm0INsyCYUGqqNUgW/3yCooxafW/3RUzJ6TBCIxnAdw99gV4BtZX2BMqjynUeNnAkkI0q5tTTd1YHsdZP+Td562EcB4QiajTjkPsapPBtHJv0sMQw/FjXUjrEPJo++vY92Q0Mjyzr1mG1/jwGifJuxMe6mhg0QqPJAOs66/QLuxWs5f9gLOjDZCSEa+OjPdd/3t7D1k4ZpUoNdy+exvkTwXpEXQ9o8xPpbulfVU8s7B3gm/VLT0xcOaMXufHi+w6ef/2tCSfCw5jkpxVksMZx8qrm/pefWLNLuv0wOo7FyxHdfrS5rYkFSU6auHrWa7njik5sFfc9xydc1TmJuxDTD6/AqSF/o+2W4ua5k422nIUnCJZELK/Y4qWwrk626yYY44SJ+lg3GaRYRUvxJGd4hoGCFhSlzTD2D/LsDM/rLCf/ofBXW1EgNhQXNK3VAZsvSFS/hCgVS7P3lttnuG3VjiTLIJJ0QvEr9G3a9XaLb/DftNOXiyLWusGHJRWKtqKrVC6OecOOeD1zofUS8aGpx7moNAPN0eACUBFyQ3pCkrtldN2yVNxmSRsqONeo2x2hlGkw+Ut35f2BP1MYmlerWduTuJkgNl/X3EAvKFVElVbUk1ymI9RrHS3dMdktptz9ZhImI/oI5cuiHLBUJlv0Wvsf0wfhZj+eYHQAAAAASUVORK5CYII="
                                            alt="Emoji"
                                        />
                                    </span>
                                )}
                                <span className="experience-value">{experience.value}</span>
                            </label>
                        </div>
                        ))}
                            <div className="bankingFeedBackTemplate-feedback-content hide">\
                                <div className="list-view-feedback-heading"> 
                                    {msgData.message[0].component.payload.feedbackListHeading &&
                                        msgData.message[0].component.payload.feedbackListHeading
                                    }
                                </div>
                                <div className="experience-feedback-listItems">
                                    {feedbackList?.map((list: any) => (
                                    <div className="feedback-listItem" key={list.id}>
                                        <div className="checkbox checkbox-primary styledCSS checkboxesDiv">
                                        <input
                                            className="checkInput"
                                            type="checkbox"
                                            value={list.value}
                                            id={`${list.id}${msgData.messageId}`}
                                            checked={selectedFeedbackItems.includes(list.value)} 
                                            onChange={(event) => handleCheckboxChange(event, list.value)}
                                        />
                                        <label for={`${list.id}${msgData.messageId}`}>{list.value}</label>
                                        </div>
                                    </div>
                                    ))}
                                </div>
                                <div className="suggestions-component">
                                    <textarea className="feedback-suggestionInput" id="bankingSuggestionInput" placeholder="Please enter your message"></textarea>
                                </div>
                            
                                {msgData.message[0].component.payload?.buttons && msgData.message[0].component.payload.buttons.length ? (
                                    <div className="feedback-buttons-div">
                                        {buttons?.map((button: any) => (
                                            <div className="feedback-form-input-wrapper">
                                                <div className={`feedback-button ${button.btnType === 'confirm' ? 'feedback-submit' : 'feedback-cancel'}`}>
                                                    <button type={button.btnType} className={`custom-form-button solutionFormSubmit ${button.btnType === 'confirm' ? 'submitBtn' : 'cancelBtn'}`} onClick={() => handleSubmit(button.btnType)}>
                                                    {button.label}
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null }
                            </div>
                    </div>
                </div>
            </div>
        );
    }
}

class ratingForm extends BaseChatTemplate {
    hostInstance: any = this;

    renderMessage(msgData: any) {
        return this.getHTMLFromPreact(feedback, msgData, this.hostInstance);
    }
}

export default ratingForm;