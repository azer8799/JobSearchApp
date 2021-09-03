import {BsSearch} from 'react-icons/bs'

import './index.css'

const Filters = props => {
  console.log(props)
  const renderSalaryList = () => {
    const {salaryRangesList} = props
    // console.log(salaryRangesList)

    return salaryRangesList.map(eachItem => {
      const {changeRating} = props

      const onClickRatingItem = () => {
        changeRating(eachItem.salaryRangeId)
      }

      return (
        <li className="each-checkboxes" key={eachItem.salaryRangeId}>
          <input
            type="radio"
            className="radio-input"
            id={eachItem.salaryRangeId}
            name="salary"
          />
          <label
            htmlFor={eachItem.salaryRangeId}
            className="employee-label"
            onClick={onClickRatingItem}
          >
            {eachItem.label}
          </label>
        </li>
      )
    })
  }

  const renderRatingsFilters = () => (
    <div>
      <h1 className="filter-heading">Salary Range</h1>
      <ul className="ratings-list">{renderSalaryList()}</ul>
    </div>
  )

  const renderCategoriesList = () => {
    const {employmentTypesList} = props
    // console.log(employmentTypesList)

    return employmentTypesList.map(eachItem => {
      const {changeCategory} = props

      const onClickEmploymentItem = () =>
        changeCategory(eachItem.employmentTypeId)

      return (
        <li className="each-checkboxes" key={eachItem.employmentTypeId}>
          <input
            type="checkbox"
            className="checkbox-input"
            id={eachItem.employmentTypeId}
          />
          <label
            htmlFor={eachItem.employmentTypeId}
            className="employee-label"
            onClick={onClickEmploymentItem}
          >
            {eachItem.label}
          </label>
        </li>
      )
    })
  }

  const renderProductCategories = () => (
    <>
      <h1 className="filter-heading">Type of Employment</h1>
      <ul className="categories-list">{renderCategoriesList()}</ul>
    </>
  )

  const onEnterSearchInput = event => {
    const {enterSearchInput} = props
    if (event.key === 'Enter') {
      enterSearchInput()
    }
  }

  const onChangeSearchInput = event => {
    const {changeSearchInput} = props
    changeSearchInput(event.target.value)
  }

  const renderSearchInput = () => {
    const {searchInput} = props
    return (
      <div className="search-input-container">
        <input
          value={searchInput}
          type="search"
          className="search-input"
          placeholder="Search"
          onChange={onChangeSearchInput}
          onKeyDown={onEnterSearchInput}
        />

        <BsSearch className="search-icon" />
      </div>
    )
  }

  /* const {clearFilters} = props */

  return (
    <div className="filters-group-container">
      {renderSearchInput()}
      {renderRatingsFilters()}
      {renderProductCategories()}

      {/* <button
        type="button"
        className="clear-filters-btn"
        onClick={clearFilters}
      >
        Clear Filters
      </button> */}
    </div>
  )
}

export default Filters
