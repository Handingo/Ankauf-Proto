import "./EndProposal.css";
import { Component } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Card } from "react-bootstrap";
import Link from "../util/Link";
import * as selectionActions from "../../actions/SelectionActions";
import * as resultActions from "../../actions/ResultActions";

// Page which displays an estimated offer and lets users upload pictures/documents of the device

class EndProposal extends Component {

    state = {
        images: [],
        documents: [],
        resultValue: 0.0
    };

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleClickUploadImage = this.handleClickUploadImage.bind(this);
        this.handleClickUploadDocument = this.handleClickUploadDocument.bind(this);
        this.handleUploadImage = this.handleUploadImage.bind(this);
        this.handleUploadDocument = this.handleUploadDocument.bind(this);

        let suggestion;

        // TODO - should get connected to a database
        switch (this.props.selection.model) {
            case "Samsung Galaxy S20":
                suggestion = 500;
                break;
            case "Samsung Galaxy S21":
                suggestion = 557;
                break;
            case "Samsung Galaxy S22":
                suggestion = 627;
                break;
            case "Samsung Galaxy S23":
                suggestion = 727;
                break;
            default:
                suggestion = NaN;
        }
        
        switch (this.props.selection.color) {
            case "Black":
            case "White":
                suggestion -= 0;
                break;
            case "Purple":
                suggestion -= 10;
                break;
            default:
                suggestion = NaN;
        }
        
        switch (this.props.selection.internalMemory) {
            case "64 GB":
                suggestion -= 200;
                break;
            case "128 GB":
                suggestion -= 150;
                break;
            case "256 GB":
                suggestion -= 100;
                break;
            case "512 GB":
                suggestion -= 50;
                break;
            case "1 TB":
                suggestion -= 0;
                break;
            default:
                suggestion = NaN;
        }

        switch (this.props.condition.result) {
            case "Wie neu":
                suggestion *= 1;
                break;
            case "Sehr gut":
                suggestion *= 0.9;
                break;
            case "Gut":
                suggestion *= 0.75;
                break;
            case "Akzeptabel":
                suggestion *= 0.55;
                break;
            default:
                suggestion = NaN;
        }

        if (this.props.functionality.isFullyFunctional === "false") { // JavaScript "type conversion"... name attribute => boolean
            suggestion = NaN;
        } else {
            if (this.props.functionality.isKindaOld === "false") {
                suggestion += 25;
            }
    
            const isApple = this.props.selection.brand === "Apple";
    
            if (this.props.functionality.hasSimLock === "true") { // JavaScript "type conversion"... name attribute => boolean
                suggestion = isApple ? NaN : suggestion - 150;
            }
    
            /*if (this.props.functionality.hasMDMActive === "true") {
                suggestion = isApple ? NaN : suggestion - 150;
            }*/
    
            if (suggestion < 50) {
                suggestion = suggestion < 10 ? NaN : suggestion - 5;
            }
        }

        this.state.resultValue = suggestion;
    }

    handleClick(e) {
        e.preventDefault();

        if (!this.state.documents) {
            window.scrollTo(0, 0);
            return;
        }

        this.props.setResultValue(this.state.resultValue);
        this.props.selectStep(this.props.selection.step + 1);
        window.scrollTo(0, 0);
    }

    handleClickUploadImage(e) {
        e.preventDefault();
        document.getElementById("image-upload").click();
    }

    handleClickUploadDocument(e) {
        e.preventDefault();
        document.getElementById("document-upload").click();
    }

    handleUploadImage(e) {
        e.preventDefault();

        const name = e.currentTarget.getAttribute("name");

        if (this.state.images.length + e.currentTarget.files.length > 5) { // max 5 documents
            return;
        }

        this.setState({ // add uploaded documents to existing ones
            [name]: [...this.state.images, ...e.currentTarget.files]
        });
    }

    handleUploadDocument(e) {
        e.preventDefault();

        const name = e.currentTarget.getAttribute("name");

        if (this.state.documents.length + e.currentTarget.files.length > 5) { // max 5 documents
            return;
        }

        this.setState({ // add uploaded documents to existing ones
            [name]: [...this.state.documents, ...e.currentTarget.files]
        });
    }

    render() {
        let i = 0;
        const keys = [
            "Gerätetyp",
            "Hersteller",
            "Modell",
            "Farbe",
            "Speicherplatz",
            "Zustand",
            "Älter als 2 Jahre",
            "Funktionstest per App",
            "Sim-/Net-Lock",
            "Aktivierungssperre"
        ];
        const specifications = [];

        for (const entry in this.props.selection) {
            if (i++ === 0 || !this.props.selection.hasOwnProperty(entry)) {
                continue;
            }

            const selection = this.props.selection[entry];

            if (!selection) {
                continue;
            }

            if (i !== 2) {
                specifications.push(<hr key={-i}/>);
            }
            specifications.push(<p key={i}><strong>{keys[i - 2] + ":"}</strong><br/><i>{selection}</i></p>);
        }

        i++;
        specifications.push(<hr key={-i}/>);
        specifications.push(<p key={i}><strong>{keys[i - 2] + ":"}</strong><br/><i>{this.props.condition.result}</i></p>);

        for (const entry in this.props.functionality) {
            i++;

            if (keys[i - 2] === undefined) {
                break;
            }

            if (!this.props.functionality.hasOwnProperty(entry) || this.props.functionality[entry] === undefined) {
                continue;
            }

            const value = this.props.functionality[entry] === "true" ? "Ja" : "Nein";
            specifications.push(<hr key={-i}/>);
            specifications.push(<p key={i}><strong>{keys[i - 2] + ":"}</strong><br/><i>{value}</i></p>);
        }

        specifications.push(<hr key={-i - 1}/>);
        
        const functionalKeys = [
            "Display",
            "Telefon",
            "Akku",
            "Kamera",
            "Verbindung",
            "Leistung",
            "Biometrie",
            "Sensoren",
            "Knöpfe",
            "Speicher"
        ];

        let nonFunctional = "";

        i = 0;

        for (const entry in this.props.functionality.functionalityDetails) {
            const data = this.props.functionality.functionalityDetails[entry];
            // console.log(data)

            if (!data) {
                nonFunctional = nonFunctional.concat(functionalKeys[i] + ", ");
                // console.log(nonFunctional)
            }

            i++;
        }

        nonFunctional = nonFunctional.length > 0 ? nonFunctional.substring(0, nonFunctional.length - 2) : "N/A";
        specifications.push(<p key={i + 50}><strong>Nicht funktionsfähig:</strong><br/><i>{nonFunctional}</i></p>);

        i = 0;

        const suggestion = this.state.resultValue;

        return (
            <div id="step-end">
                <h2 id="step-end-header">Ankauf</h2>
                <br/>
                <div id="selection-result">
                    <div id="selection-result-files">
                        <Card>
                            <Card.Header>
                                <Card.Title>
                                    Fotos<i>*</i>
                                </Card.Title>
                            </Card.Header>
                            <Card.Body id="selection-result-images-body">
                                <Button id="image-upload-button" variant="secondary" onClick={this.handleClickUploadImage}>Foto hochladen</Button>
                                <input type="file" id="image-upload" name="images" onChange={this.handleUploadImage}/>
                                {this.state.images.length > 0 &&
                                    this.state.images.map(image => {
                                        const name = image.name.toLowerCase();
                                        const splitName = name.split(".");

                                        if (splitName.length < 2) { // name is empty or has no ending
                                            return null;
                                        }

                                        const ending = "." + splitName[splitName.length - 1]

                                        if (![".jpg", ".png", ".heic"].includes(ending)) {
                                            return null;
                                        }

                                        return <Card.Img key={i++} src={URL.createObjectURL(image)} onClick={this.handleClickUploadImage}></Card.Img>;
                                    })
                                }
                            </Card.Body>
                        </Card>
                        <Card>
                            <Card.Header>
                                <Card.Title>
                                    Dokumente<i>*</i>
                                </Card.Title>
                            </Card.Header>
                            <Card.Body id="selection-result-documents-body">
                                <Button id="document-upload-button" variant="secondary" onClick={this.handleClickUploadDocument}>Dokument hochladen</Button>
                                <input type="file" id="document-upload" name="documents" onChange={this.handleUploadDocument}/>
                                {this.state.documents.length > 0 &&
                                    this.state.documents.map(document => {
                                        const name = document.name.toLowerCase();
                                        const splitName = name.split(".");

                                        if (splitName.length < 2) { // name is empty or has no ending
                                            return null;
                                        }

                                        const ending = "." + splitName[splitName.length - 1]

                                        if (![".pdf", ".docx", ".odt", ".jpg", ".png", ".heic"].includes(ending)) {
                                            return null;
                                        }

                                        return <Card.Img key={i++} src={URL.createObjectURL(document)} onClick={this.handleClickUploadDocument}></Card.Img>;
                                    })
                                }
                            </Card.Body>
                        </Card>
                    </div>
                    <Card id="selection-result-details">
                        <Card.Header>
                            <Card.Title>
                                Angaben
                            </Card.Title>
                        </Card.Header>
                        <Card.Body>
                            {specifications}
                        </Card.Body>
                    </Card>
                </div>
                <br/>
                <p>* Hier kannst du bis zu 5 Dateien hochladen.</p>
                <br/>
                <h3>Unser Vorschlag:</h3>
                {!isNaN(suggestion)
                    ? <h2 id="proposal">{suggestion.toLocaleString(undefined, { minimumFractionDigits: 2 }) + " €"}</h2>
                    : <div id="proposal-failure-text">
                        <p>Leider scheint es so, als würden wir dein Gerät nicht ankaufen.</p>
                        <p>Bei Fragen, melde dich gerne unter <Link newTab text="https://handingo.de/pages/kontakt" href="https://handingo.de/pages/kontakt"/>.</p>
                      </div>
                }
                <br/>
                <br/>
                <Button disabled={isNaN(suggestion)} id="button-create-ticket" onClick={this.handleClick}>Jetzt verkaufen!</Button>
            </div>
        );
    }
}

const mapStateToProps = dispatch => bindActionCreators({
    selectStep: selectionActions.getSelectStepAction,
    setResultValue: resultActions.getResultValueAction
}, dispatch);

export default connect(state => { return state; }, mapStateToProps)(EndProposal);