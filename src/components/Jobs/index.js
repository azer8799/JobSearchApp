import './index.css'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import AllJobs from '../AllJobs'
import Header from '../Header'

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class Jobs extends Component {
  state = {
    apiStatus: apiConstants.initial,
    profileData: {},
  }

  componentDidMount() {
    this.getApiRequest()
  }

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  fetchedData = data => ({
    name: data.profile_details.name,
    profileImageUrl: data.profile_details.profile_image_url,
    shortBio: data.profile_details.short_bio,
  })

  renderFailureView = () => (
    <div className="product-details-error-view-container">
      <Link to="https://apis.ccbp.in/profile">
        <button type="button" className="button">
          Retry
        </button>
      </Link>
    </div>
  )

  getApiRequest = async () => {
    this.setState({apiStatus: apiConstants.loading})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = this.fetchedData(data)
      this.setState({apiStatus: apiConstants.success, profileData: updatedData})
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  renderProfileDetailsView = () => {
    const {profileData} = this.state
    const {name, profileImageUrl, shortBio} = profileData

    return (
      <>
        <Header />
        <div className="jobsList-container">
          <div className="profile-container">
            <img
              src={profileImageUrl}
              alt="profile"
              className="profile-imageurl"
            />
            <h1 className="profile-heading">{name}</h1>
            <p className="profile-desc">{shortBio}</p>
          </div>
          <hr className="line" />

          <div className="checkbox-container">
            <p className="title">Type of Employment</p>
            <AllJobs />
          </div>
        </div>
      </>
    )
  }

  renderAllList = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.success:
        return this.renderProfileDetailsView()
      case apiConstants.loading:
        return this.renderLoadingView()
      case apiConstants.failure:
        return this.renderFailureView()

      default:
        return null
    }
  }

  render() {
    return <div className="jobs-container">{this.renderAllList()}</div>
  }
}

export default Jobs
