import {Link} from 'react-router-dom'
import './index.css'

const JobsCard = props => {
  const {jobData} = props
  const {
    title,
    companyLogoUrl,
    employmentType,
    id,
    rating,
    jobDescription,
    packagePerAnnum,
    location,
  } = jobData

  return (
    //   Wrap with Link from react-router-dom
    <Link to={`/jobs/${id}`} className="link-item">
      <li className="job-item">
        <div className="card-image-container">
          <img src={companyLogoUrl} alt="company logo" className="thumbnail" />
          <div className="card-content-align">
            <h1 className="title">{title}</h1>
            <div className="rating-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                alt="star"
                className="star"
              />
              <span className="jobCard-rating">{rating}</span>
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
        <hr className="horizontal-line" />
        <div className="job-details">
          <h1 className="card-heading">Description</h1>
          <p className="jobCard-desc">{jobDescription}</p>
        </div>
      </li>
    </Link>
  )
}
export default JobsCard
