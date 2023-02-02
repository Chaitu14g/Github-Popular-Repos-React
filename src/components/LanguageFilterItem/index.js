import './index.css'

const LanguageFilterItem = props => {
  const {eachItem, onCLickTypeSort, queryParameter} = props
  const {id, language} = eachItem
  const allButtonClass = id === queryParameter ? 'allClass' : ''
  const onButtonClicked = () => {
    onCLickTypeSort(id)
  }
  return (
    <li>
      <button
        className={`singleLanguageButton ${allButtonClass}`}
        type="button"
        onClick={onButtonClicked}
      >
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
