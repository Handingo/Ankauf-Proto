import { Component } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Card } from "react-bootstrap";
import * as selectionActions from "../../actions/SelectionActions";

class StepEnd extends Component {

    state = {
        documents: undefined
    }

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleClickUpload = this.handleClickUpload.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
    }

    handleClick(e) {
        e.preventDefault();

        if (!this.state.documents) {
            return;
        }

        this.props.selectStep(this.props.selection.step + 1);
    }

    handleClickUpload(e) {
        e.preventDefault();
        document.getElementById("file-upload").click();
    }

    handleUpload(e) {
        e.preventDefault();
        this.setState({
            documents: e.currentTarget.files
        });
    }

    render() {
        let suggestion;

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

        switch (this.props.selection.condition) {
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

        let i = 0;
        const keys = [
            "Gerätetyp",
            "Hersteller",
            "Modell",
            "Farbe",
            "Speicherplatz",
            "Zustand"
        ];
        let specifications = [];

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

        return (
            <div id="step-end">
                <h2>Ankauf</h2>
                <br/>
                <div id="selection-result">
                    <Card id="selection-result-image">
                        <Card.Header>
                            <Card.Title>
                                Foto
                            </Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <input type="file" id="file-upload" name="photos" onChange={this.handleUpload}/>
                            {this.state.documents
                                ? <Card.Img src={URL.createObjectURL(this.state.documents[0])} onClick={this.handleClickUpload}></Card.Img>
                                : <Button id="document-upload-button" variant="secondary" onClick={this.handleClickUpload}>Dokumente hochladen</Button>
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
                <h3>Unser Vorschlag:</h3>
                <h2>{!isNaN(suggestion) ? suggestion.toLocaleString(undefined, { minimumFractionDigits: 2 }) + " €" : "Es konnte kein Vorschlag bestimmt werden."}</h2>
                <br/>
                <Button id="button-create-ticket" onClick={this.handleClick}>Jetzt verkaufen!</Button>
            </div>
        );
    }
}

const mapStateToProps = dispatch => bindActionCreators({
    selectStep: selectionActions.getSelectStepAction
}, dispatch);

export default connect(state => { return state; }, mapStateToProps)(StepEnd);