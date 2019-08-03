import React, { Component } from 'react';
import { connect } from 'react-redux';
import { searchWordEntered, startSearch, addCharacter } from './redux/actions';

const highlightOriginal = [];
const highlightBrackets = ['(', ')'];

class Item extends React.PureComponent {
  highlighted(){
    return this.props.highlights.some(str => this.props.charData.name.includes(str));
  }

  render(){
    const highlightClass = this.highlighted() ? 'highlighted' : '';
    const { charData, onClick } = this.props;

    return (
      <li data-testid="result" data-name={charData.name}
        className={`${highlightClass} list-group-item d-flex justify-content-between align-items-center`}>
        <span data-testid="res-name">{charData.name}</span>
        <button
          data-testid="addBtn"
          className="btn btn-primary btn-sm"
          data-id={charData.id}
          onClick={onClick}
        >
          Add
        </button>
      </li>
    )
  }
}

class Search extends Component {
  constructor(props){
    super(props);
    this.state = {
      highlight: false,
      query:"",
    }
    this.search = this.search.bind(this);
    this.saveQuery = this.saveQuery.bind(this);
    this.update = this.update.bind(this);
    this.toggleHighlight = this.toggleHighlight.bind(this);
    this.update = this.update.bind(this);
  }

  toggleHighlight() {
    this.setState({ highlight: !this.state.highlight });
  }

  highlights() {
    if (this.state.highlight) {
      return highlightBrackets;
    } else {
      return highlightOriginal;
    }
  }

  // REDUX ACTION 2
  search(event){
    event.preventDefault();
    this.props.dispatch(startSearch(this.state.query));
  }

  // REDUX Action 1
  saveQuery(event){
    this.setState({
      query:event.target.value
    })
    //this.props.dispatch(searchWordEntered(event.target.value));
  }

  // removeResult(r){
  //   const newResult = this.props.results.filter( res => res.id !== r);
  //   this.setState({
  //     results: newResult
  //   });
  // }

  update(event){
    const charID = parseInt(event.target.dataset.id);
    this.props.dispatch(addCharacter(charID));
  }


  results(){
    return this.props.results.map(c =>
      <Item highlights={this.highlights()} charData={c} key={c.id} onClick={this.update} />
    )
  }

  renderResults(){
    if (this.props.results.length === 0) { return null; }

    return (
      <div data-testid="searchRes" className="col-lg-10 noIdent">
        <div className="bs-component">
          <ul className="list-group">
            {this.results()}
          </ul>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="row">
        <div className="col-lg-12">
        <form className="bs-component" onSubmit={this.search}>
          <div className="form-row">
            <div className="col-sm-8">
              <input
                className="form-control form-control-lg"
                onChange={this.saveQuery}
                value={this.state.query}
                placeholder="Search for Character by Name"
                data-testid="search"
                type="text" required/>
            </div>
            <div className="col-sm-2">
              <div className="custom-control custom-checkbox">
                    <input type="checkbox" className="custom-control-input" id="customCheck1" onChange={this.toggleHighlight} />
                    <label className="custom-control-label" htmlFor="customCheck1">Extended</label>
              </div>
            </div>
            <div className="col-sm-2">
              <button className="btn btn-primary btn-lg" data-testid="searchBtn">Search</button>
            </div>
          </div>
        </form>
        {this.props.loading
          ? <div className="col-lg-12">
            <div className="bs-component">
              <div className="progress">
                <div className="progress-bar progress-bar-striped progress-bar-animated"
                  data-testid="searchRes"
                  role="progressbar"
                  aria-valuenow="75"
                  aria-valuemin="0"
                  aria-valuemax="100"
                  style={{ width: "75%" }}>
                  Loading...
                </div>
              </div>
            </div>
          </div>
          : this.renderResults() }
        </div>
      </div>
    );
  }
}

function mapStateToProps(state){
  const teamIds = state.team.map(char => char.id);
  const filteredResults = state.results.filter(char => !teamIds.includes(char.id));
  return {loading: state.loading, results: filteredResults };
}

export default connect(mapStateToProps)(Search);
