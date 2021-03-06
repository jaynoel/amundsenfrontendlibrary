import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { TABLE_RESOURCE_TITLE, USER_RESOURCE_TITLE } from 'components/SearchPage/constants';
import AppConfig from 'config/config';
import { GlobalState } from 'ducks/rootReducer';
import {
  DashboardSearchResults,
  SetResourceRequest,
  TableSearchResults,
  UserSearchResults
} from 'ducks/search/types';
import { ResourceType } from 'interfaces/Resources';
import { setResource } from 'ducks/search/reducer';

export interface StateFromProps {
  selectedTab: ResourceType,
  tables: TableSearchResults;
  dashboards: DashboardSearchResults;
  users: UserSearchResults;
}

export interface DispatchFromProps {
  setResource: (resource: ResourceType) => SetResourceRequest;
}

export type ResourceSelectorProps = StateFromProps & DispatchFromProps;

interface ResourceOptionConfig {
  type: ResourceType;
  label: string;
  count: number;
}

export class ResourceSelector extends React.Component<ResourceSelectorProps > {
  constructor(props) {
    super(props);
  }

  onChange = (event) => {
    this.props.setResource(event.target.value);
  };

  renderRadioOption = (option: ResourceOptionConfig, index: number) => {
    return (
      <div key={`resource-radio-item:${index}`} className="radio">
        <label className="radio-label">
          <input
            type="radio"
            name="resource"
            value={ option.type }
            checked={ this.props.selectedTab === option.type }
            onChange={ this.onChange }
          />
          <span className="subtitle-2">{ option.label }</span>
          <span className="body-secondary-3 pull-right">{ option.count }</span>
        </label>
      </div>
    );
  };

  render = () => {
    const resourceOptions = [{
      type: ResourceType.table,
      label: TABLE_RESOURCE_TITLE,
      count: this.props.tables.total_results,
    }];

    if (AppConfig.indexUsers.enabled) {
      resourceOptions.push({
        type: ResourceType.user,
        label: USER_RESOURCE_TITLE,
        count: this.props.users.total_results,
      });
    }

    return (
      <>
        <div className="title-2">Resource</div>
        {
          resourceOptions.map((option, index) => this.renderRadioOption(option, index))
        }
      </>
    );
  }
}

export const mapStateToProps = (state: GlobalState) => {
  return {
    selectedTab: state.search.selectedTab,
    tables: state.search.tables,
    users: state.search.users,
    dashboards: state.search.dashboards,
  };
};

export const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({ setResource }, dispatch);
};

export default connect<StateFromProps, DispatchFromProps>(mapStateToProps, mapDispatchToProps)(ResourceSelector);
