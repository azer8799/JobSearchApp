import Cookies from 'js-cookie'
import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import SimilarProducts from '../SimilarProducts'
import './index.css'
import Skills from '../Skills'

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class JobDetails extends Component {
  state = {
    apiStatus: apiConstants.initial,
    jobsData: {},
    skillsData: [],
    lifeAtCompany: {},
    similarProductsData: [],
  }

  componentDidMount() {
    this.getApiRequest()
  }

  getFullDetails = data => ({
    companyWebsiteUrl: data.job_details.company_website_url,
    companyLogoUrl: data.job_details.company_logo_url,
    employmentType: data.job_details.employment_type,
    description: data.job_details.life_at_company.description,
    lifeImageUrl: data.job_details.life_at_company.image_url,
    id: data.job_details.id,
    jobDescription: data.job_details.job_description,
    packagePerAnnum: data.job_details.package_per_annum,
    location: data.job_details.location,
    rating: data.job_details.rating,
  })

  getFormattedData = data => ({
    companyLogoUrl: data.company_logo_url,
    employmentType: data.employment_type,
    id: data.id,
    jobDescription: data.job_description,
    rating: data.rating,
    title: data.title,
    location: data.location,
    imageUrl: data.image_url,
    name: data.name,
  })

  getApiRequest = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    this.setState({apiStatus: apiConstants.loading})
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)

    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = this.getFullDetails(fetchedData)

      const updatedLife = this.getFullDetails(fetchedData)

      const updatedSkills = fetchedData.job_details.skills.map(eachItem =>
        this.getFormattedData(eachItem),
      )

      const updatedSimilarProductsData = fetchedData.similar_jobs.map(
        eachSimilarProduct => this.getFormattedData(eachSimilarProduct),
      )

      this.setState({
        jobsData: updatedData,
        skillsData: updatedSkills,
        apiStatus: apiConstants.success,
        lifeAtCompany: updatedLife,
        similarProductsData: updatedSimilarProductsData,
      })
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div className="products-details-loader-container" testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

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
      <Link to="https://apis.ccbp.in/jobs/:id">
        <button className="button" type="button">
          Retry
        </button>
      </Link>
    </div>
  )

  renderJobDetailsView = () => {
    const {
      jobsData,
      skillsData,
      similarProductsData,
      lifeAtCompany,
    } = this.state

    const {
      companyWebsiteUrl,
      companyLogoUrl,
      employmentType,
      jobDescription,
      rating,
      packagePerAnnum,
      location,
    } = jobsData

    const {description, lifeImageUrl} = lifeAtCompany
    // console.log(this.props)
    //  console.log(companyWebsiteUrl, jobDescription)

    return (
      <div className="job-details-container">
        <div className="job-item">
          <div className="card-image-container">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="thumbnail"
            />

            <div className="card-content-align">
              <div className="jobDetails-rating-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                  alt="star"
                  className="star"
                />
                <span className="jobDetails-rating">{rating}</span>
              </div>
            </div>
          </div>
          <div className="location">
            <p className="jobCard-desc">{location}</p>

            <p className="jobCard-desc">{employmentType}</p>
            <div className="salary">
              <p className="jobCard-desc">{packagePerAnnum}</p>
            </div>
          </div>

          <div className="job-details">
            <h1 className="price">Description</h1>
            <a href={companyWebsiteUrl}> Visit </a>

            <p className="jobCard-desc">{jobDescription}</p>
          </div>
          <div className="skills-container">
            <h1 className="skills-heading">Skills</h1>
            <ul className="all-skills">
              {skillsData.map(eachItem => (
                <Skills skillDetails={eachItem} key={eachItem.id} />
              ))}
            </ul>

            <div className="company-container">
              <h1 className="company-heading">Life at Company</h1>
              <p className="jobCard-desc">{description}</p>
              <img
                src={lifeImageUrl}
                alt="life at company"
                className="life-image"
              />
            </div>
          </div>
        </div>

        <h1 className="similar-products-heading">Similar Jobs</h1>

        <ul className="similar-products-list">
          {similarProductsData.map(eachSimilarProduct => (
            <SimilarProducts
              jobDetails={eachSimilarProduct}
              key={eachSimilarProduct.id}
            />
          ))}
        </ul>
      </div>
    )
  }

  renderAllList = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.success:
        return this.renderJobDetailsView()
      case apiConstants.loading:
        return this.renderLoadingView()
      case apiConstants.failure:
        return this.renderFailureView()

      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="product-item-details-container">
          {this.renderAllList()}
        </div>
      </>
    )
  }
}

export default JobDetails
