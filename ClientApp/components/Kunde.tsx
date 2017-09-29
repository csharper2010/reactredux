import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState }  from '../store';
import * as KundeStore from '../store/Kunde';

type KundeProps =
    KundeStore.KundeState
    & typeof KundeStore.actionCreators
    & RouteComponentProps<{}>;

class Kunde extends React.Component<KundeProps, {}> {
    public render() {
        return <div>
                <h1>Kunde</h1>
                <table>
                    <tbody>
                        <tr>
                            <td><label>Name:</label></td>
                            <td><input type='text' value={this.props.name} onChange={ event => this.props.setName(event.target.value) } /></td>
                        </tr>
                        <tr>
                            <td><label>Given Name:</label></td>
                            <td><input type='text' value={this.props.givenName} onChange={ event => this.props.setGivenName(event.target.value) } /></td>
                        </tr>
                    </tbody>
                </table>
            </div>;
    }
}

export default connect(
    (state: ApplicationState) => state.kunde,
    KundeStore.actionCreators)(Kunde) as typeof Kunde;