import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// TODO: Use css-modules instead of 'import'
import './styles.scss';
import { GlobalState } from 'ducks/rootReducer';
import { getLastIndexed } from 'ducks/tableMetadata/reducer';
import { GetLastIndexedRequest } from 'ducks/tableMetadata/types';

import { DATE_FORMAT_LONG, formatEpochTime } from 'utils/dateUtils';

// Props
interface StateFromProps {
  lastIndexed: number;
}

interface DispatchFromProps {
  getLastIndexed: () => GetLastIndexedRequest;
}

export type FooterProps = StateFromProps & DispatchFromProps;

export class Footer extends React.Component<FooterProps> {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getLastIndexed();
  }

  generateDateTimeString = () => {
    return formatEpochTime(this.props.lastIndexed, DATE_FORMAT_LONG);
  };

  render() {
    let content;
    if (this.props.lastIndexed !== null) {
      content = <div>{`Amundsen was last indexed on ${this.generateDateTimeString()}`}</div>;
    }
    return (
      <div>
        <div className="phantom-div" />
        <div id="footer" className="footer">
          { content }
        </div>
      </div>
    );
  }
}


export const mapStateToProps = (state: GlobalState) => {
  return {
    lastIndexed: state.tableMetadata.lastIndexed
  }
};

export const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getLastIndexed }, dispatch);
};

export default connect<StateFromProps, DispatchFromProps>(mapStateToProps, mapDispatchToProps)(Footer);
