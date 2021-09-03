import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'

import Filters from '../Filters'
// import ProductCard from '../ProductCard'
// import ProductsHeader from '../ProductsHeader'

import './index.css'
import JobsCard from '../JobsCard'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class AllJobs extends Component {
  state = {
    jobsList: [],
    apiStatus: apiStatusConstants.initial,
    activeCategoryId: '',
    searchInput: '',
    activeRatingId: '',
  }

  componentDidMount() {
    this.getJobs()
  }

  getJobs = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const {activeCategoryId, searchInput, activeRatingId} = this.state
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${activeCategoryId}&minimum_package=${activeRatingId}&search=${searchInput}`

    // const apiUrl = 'https://apis.ccbp.in/jobs?employment_type=FULLTIME,PARTTIME&minimum_package=1000000&search=""'

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      console.log(fetchedData)

      const updatedData = fetchedData.jobs.map(product => ({
        title: product.title,
        companyLogoUrl: product.company_logo_url,
        employmentType: product.employment_type,
        id: product.id,
        rating: product.rating,
        jobDescription: product.job_description,
        packagePerAnnum: product.package_per_annum,
        location: product.location,
      }))
      this.setState({
        jobsList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  //   changeSortby = activeOptionId => {
  //     this.setState({activeOptionId}, this.getJobs)
  //   }

  //   clearFilters = () => {
  //     this.setState(
  //       {
  //         searchInput: '',
  //         activeCategoryId: '',
  //         activeRatingId: '',
  //       },
  //       this.getJobs,
  //     )
  //   }

  changeRating = activeRatingId => {
    this.setState({activeRatingId}, this.getJobs)
  }

  changeCategory = activeCategoryId => {
    this.setState({activeCategoryId}, this.getJobs)
  }

  enterSearchInput = () => {
    this.getJobs()
  }

  changeSearchInput = searchInput => {
    this.setState({searchInput})
  }

  renderFailureView = () => (
    <div className="jobs-error-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="jobs-failure-img"
      />
      <h1 className="jobs-failure-heading-text">Oops! Something Went Wrong</h1>
      <p className="jobs-failure-description">
        We cannot seem to find the page you are looking for.
      </p>
      <Link to="https://apis.ccbp.in/jobs">
        <button className="button" type="button">
          Retry
        </button>
      </Link>
    </div>
  )

  renderJobsListView = () => {
    const {jobsList} = this.state
    const shouldShowProductsList = jobsList.length > 0

    return shouldShowProductsList ? (
      <div className="all-products-container">
        {/* <ProductsHeader
            activeOptionId={activeOptionId}
            changeSortby={this.changeSortby}
          /> */}
        <ul className="products-list">
          {jobsList.map(job => (
            <JobsCard jobData={job} key={job.id} />
          ))}
        </ul>
      </div>
    ) : (
      <div className="no-products-view">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          className="no-products-img"
          alt="no jobs"
        />
        <h1 className="no-products-heading">No Jobs Found</h1>
        <p className="no-products-description">
          We could not find any jobs. Try other filters.
        </p>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderAllProducts = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobsListView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const {activeCategoryId, searchInput, activeRatingId} = this.state

    return (
      <div className="all-products-section">
        <Filters
          searchInput={searchInput}
          employmentTypesList={employmentTypesList}
          salaryRangesList={salaryRangesList}
          activeRatingId={activeRatingId}
          activeCategoryId={activeCategoryId}
          //   categoryOptions={categoryOptions}
          //   ratingsList={ratingsList}
          changeSearchInput={this.changeSearchInput}
          enterSearchInput={this.enterSearchInput}
          changeCategory={this.changeCategory}
          changeRating={this.changeRating}
          //   clearFilters={this.clearFilters}
        />
        {this.renderAllProducts()}
      </div>
    )
  }
}

export default AllJobs
