import style from "./Card.module.css"

const Card = (customClass) => {
  return (
    <div className={`${style.container} ${style[customClass]}`}>
        <h1>Título</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab cumque minima dolorum nobis blanditiis quisquam amet incidunt repudiandae magnam inventore, a voluptatum neque mollitia, assumenda nihil delectus? Ipsa, distinctio eveniet.</p>
    </div>
  )
}

export default Card