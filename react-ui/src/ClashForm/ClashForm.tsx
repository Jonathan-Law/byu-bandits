import * as React from 'react';
import InputComponent from '../InputComponent';
import './form.css';
import SearchClans from './SearchClans';

export default class ClashForm extends React.Component<{ className: string }, {}> {
  render() {
    const { className } = this.props;
    const _className = `${className} clash-form`;
    return (
      <form className={_className}>
        <h1>Clash Form</h1>
        <SearchClans className=''></SearchClans>
      </form>
    );
  }
}
