function CarPreview({ car }) {
  const style = {
    width: '300px',
    height: '150px',
    backgroundColor: car.exterior,
    borderRadius: '12px',
    margin: '20px auto',
    position: 'relative'
  }

  return (
    <div>
      <div style={style}></div>
      <p>{car.make} {car.model}</p>
      <p>{car.interior}</p>
    </div>
  )
}

export default CarPreview