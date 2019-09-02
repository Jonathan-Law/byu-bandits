import * as React from 'react';
import './searchClans.css';
import ClashService from '../ClashService';

export default class SearchClans extends React.Component<{ className: string }, { query: string; resp: CLASH.ISearchClanItems }> {
  constructor(props: { className: string }) {
    super(props);
    this.state = {
      query: '',
      resp: {},
    };
  }

  public updateQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ query: e.target.value });
  };

  public callQuery = (e: any) => {
    e.preventDefault();
    ClashService.searchClans(this.state.query).then((resp: any) => {
      this.setState({
        ...this.state,
        resp,
      });
    });
    return false;
  };

  public render() {
    const { className } = this.props;
    const _className = `${className} search-clans-form`;
    return (
      <div className={_className}>
        <h6>Search Clans</h6>
        <form onSubmit={this.callQuery}>
          <input type='text' placeholder='search' name='query' value={this.state.query} onChange={this.updateQuery} />
        </form>
        <pre>{this.state.resp.items ? this.state.resp.items.map((i, index) => {
          return (<div key={index}>
              <img width="70" height="auto" src={i.badgeUrls.small} alt="badge"/>
              <span>{i.name}</span>
            </div>);
        }): ''}</pre>
      </div>
    );
  }
}
