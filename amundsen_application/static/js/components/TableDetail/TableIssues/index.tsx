import * as React from 'react';
import { GlobalState } from 'ducks/rootReducer';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { JiraIssue } from 'interfaces'; 
import { getJiraIssues } from 'ducks/jira/reducer'; 
import './styles.scss';
import { GetJiraIssuesRequest } from 'ducks/jira/types';

export interface StateFromProps {
  jiraIssues: JiraIssue[]; 
}

export interface DispatchFromProps {
  getJiraIssues: (key: string) => GetJiraIssuesRequest; 
}

export interface ComponentProps {
  tableKey: string;
}

export type TableIssueProps = StateFromProps & DispatchFromProps & ComponentProps; 

export class TableIssues extends React.Component<TableIssueProps> {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getJiraIssues(this.props.tableKey);
  }

  renderIssue = (issue: JiraIssue, index: number) => {
    return (
      <div className="issue-banner truncated" key={`jira-issue-${index}`}>
        <a target="_blank" href={issue.url}>
          { issue.issue_key }
        </a>
        &nbsp;&mdash; { issue.title }
      </div>
    )
  };

  render() {

    if (this.props.jiraIssues.length === 0) {
      return null;
    }

    return (
        <div className="table-issues">
          { this.props.jiraIssues.map(this.renderIssue)}
        </div>
    );
  }
}

export const mapStateToProps = (state: GlobalState, componentProps: ComponentProps) => {
  return {
    jiraIssues: state.jira.jiraIssues,
    tableKey: componentProps.tableKey
  };
};

export const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({ getJiraIssues }, dispatch);
};

export default connect<StateFromProps, DispatchFromProps, ComponentProps>(mapStateToProps, mapDispatchToProps)(TableIssues);
