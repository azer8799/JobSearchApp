// Write your code here
import './index.css'

const SimilarProductItem = props => {
  const {jobDetails} = props
  const {
    title,
    location,
    jobDescription,
    companyLogoUrl,
    rating,
    employmentType,
  } = jobDetails
  return (
    <li className="job-item">
      <div className="card-image-container">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
          className="thumbnail"
        />
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
      </div>

      <div className="job-details">
        <h1 className="price">Description</h1>
        <p className="jobCard-desc">{jobDescription}</p>
      </div>
    </li>
  )
}

export default SimilarProductItem
