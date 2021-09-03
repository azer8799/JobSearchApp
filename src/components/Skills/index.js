import './index.css'

const Skills = props => {
  const {skillDetails} = props
  const {name, imageUrl} = skillDetails
  return (
    <li className="skills-logo-container">
      <img src={imageUrl} alt={name} className="skills-logo" />
      <p className="skills-desc">{name}</p>
    </li>
  )
}

export default Skills
