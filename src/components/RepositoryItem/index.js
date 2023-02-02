import './index.css'

const RepositoryItem = props => {
  const {eachItem} = props
  const {name, issuesCount, forksCount, starsCount, avatarUrl} = eachItem
  return (
    <li className="singleRepositoryItem">
      <img alt={name} src={avatarUrl} className="singleRepositoryItemImage" />
      <h1 className="singleRepositoryItemHeading">{name}</h1>
      <div className="singleRepositoryItemSub">
        <img
          className="starImage"
          alt="stars"
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
        />
        <p className="starsPara">{`${starsCount} stars`}</p>
      </div>
      <div className="singleRepositoryItemSub">
        <img
          className="starImage"
          alt="forks"
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
        />
        <p className="starsPara">{`${forksCount} forks`}</p>
      </div>
      <div className="singleRepositoryItemSub">
        <img
          className="starImage"
          alt="open issues"
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
        />
        <p className="starsPara">{`${issuesCount} open issues`}</p>
      </div>
    </li>
  )
}

export default RepositoryItem
