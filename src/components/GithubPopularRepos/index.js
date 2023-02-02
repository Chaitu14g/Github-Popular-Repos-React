import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'
import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

class GithubPopularRepos extends Component {
  state = {
    obtainedList: [],
    apiResult: 'Loading',
    queryParameter: 'ALL',
  }

  componentDidMount = () => {
    this.getRepositoryItems()
  }

  getRepositoryItems = async () => {
    this.setState({apiResult: 'Loading'})
    const {queryParameter} = this.state
    const url = `https://apis.ccbp.in/popular-repos?language=${queryParameter}`
    const response = await fetch(url)
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.popular_repos.map(eachItem => ({
        name: eachItem.name,
        id: eachItem.id,
        issuesCount: eachItem.issues_count,
        forksCount: eachItem.forks_count,
        starsCount: eachItem.stars_count,
        avatarUrl: eachItem.avatar_url,
      }))
      this.setState({
        obtainedList: updatedData,
        apiResult: 'done',
      })
    } else {
      this.setState({
        apiResult: 'failed',
      })
    }
  }

  onCLickTypeSort = id => {
    this.setState(
      {
        queryParameter: id,
      },
      this.getRepositoryItems,
    )
  }

  renderLoading = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={50} width={50} />
    </div>
  )

  renderFailed = () => (
    <div className="failureViewContainer">
      <img
        alt="failure view"
        className="failureViewImage"
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
      />
      <h1 className="failureViewContainerHeading">Something Went Wrong</h1>
    </div>
  )

  renderSuccess = () => {
    const {obtainedList} = this.state
    return (
      <ul className="languageContainer">
        {obtainedList.map(eachItem => (
          <RepositoryItem key={eachItem.id} eachItem={eachItem} />
        ))}
      </ul>
    )
  }

  renderFinalOutput = () => {
    const {apiResult} = this.state
    if (apiResult === 'Loading') {
      return this.renderLoading()
    }
    if (apiResult === 'done') {
      return this.renderSuccess()
    }
    if (apiResult === 'failed') {
      return this.renderFailed()
    }
    return this.renderLoading()
  }

  render() {
    const {queryParameter} = this.state
    return (
      <div className="backgroundContainer">
        <h1 className="mainHeading">Popular</h1>
        <ul className="languageContainer">
          {languageFiltersData.map(eachItem => (
            <LanguageFilterItem
              key={eachItem.id}
              eachItem={eachItem}
              onCLickTypeSort={this.onCLickTypeSort}
              queryParameter={queryParameter}
            />
          ))}
        </ul>
        <div className="finalOutputContainer">{this.renderFinalOutput()}</div>
      </div>
    )
  }
}

export default GithubPopularRepos
