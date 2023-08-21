import "./EndProposal.css";
import { Component } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Card } from "react-bootstrap";
import Link from "../util/Link";
import * as selectionActions from "../../actions/SelectionActions";

// Page which displays an estimated offer and lets users upload pictures/documents of the device

class EndProposal extends Component {

    state = {
        documents: []
    };

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleClickUpload = this.handleClickUpload.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
    }

    handleClick(e) {
        e.preventDefault();

        if (!this.state.documents) {
            window.scrollTo(0, 0);
            return;
        }

        this.props.selectStep(this.props.selection.step + 1);
        window.scrollTo(0, 0);
    }

    handleClickUpload(e) {
        e.preventDefault();
        document.getElementById("file-upload").click();
    }

    handleUpload(e) {
        e.preventDefault();

        if (this.state.documents.length + e.currentTarget.files.length > 5) { // max 5 documents
            return;
        }

        this.setState({ // add uploaded documents to existing ones
            documents: [...this.state.documents, ...e.currentTarget.files]
        });
    }

    render() {
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
    
            if (this.props.functionality.hasMDMActive === "true") {
                suggestion = isApple ? NaN : suggestion - 150;
            }
    
            if (suggestion < 50) {
                suggestion = suggestion < 10 ? NaN : suggestion - 5;
            }
        }

        let i = 0;
        const keys = [
            "Gerätetyp",
            "Hersteller",
            "Modell",
            "Farbe",
            "Speicherplatz",
            "Zustand",
            "Voll funktionsfähig",
            "Älter als 2 Jahre",
            "Sim-/Net-Lock",
            "Aktivierungssperre",
            "Aktive MDM-Software"
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

            if (!this.props.functionality.hasOwnProperty(entry) || this.props.functionality[entry] === undefined) {
                continue;
            }

            const value = this.props.functionality[entry] === "true" ? "Ja" : "Nein";
            specifications.push(<hr key={-i}/>);
            specifications.push(<p key={i}><strong>{keys[i - 2] + ":"}</strong><br/><i>{value}</i></p>);
        }

        i = 0;

        return (
            <div id="step-end">
                <h2 id="step-end-header">Ankauf</h2>
                <br/>
                <div id="selection-result">
                    <Card id="selection-result-image">
                        <Card.Header>
                            <Card.Title>
                                Fotos / Dokumente<i>*</i>
                            </Card.Title>
                        </Card.Header>
                        <Card.Body id="selection-result-image-body">
                            <Button id="document-upload-button" variant="secondary" onClick={this.handleClickUpload}>Dateien hochladen</Button>
                            <input type="file" id="file-upload" name="photos" onChange={this.handleUpload}/>
                            {this.state.documents.length > 0 &&
                                this.state.documents.map(document => {
                                    const name = document.name.toLowerCase();

                                    if (!name.endsWith(".jpg") && !name.endsWith(".png") && !name.endsWith(".heic")) {
                                        return null;
                                    }

                                    return <Card.Img key={i++} src={URL.createObjectURL(document)} onClick={this.handleClickUpload}></Card.Img>;
                                })
                            }
                        </Card.Body>
                    </Card>
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
    selectStep: selectionActions.getSelectStepAction
}, dispatch);

export default connect(state => { return state; }, mapStateToProps)(EndProposal);