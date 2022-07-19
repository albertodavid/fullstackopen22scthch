const Header = ({title}) => {
    return <h1>{title}</h1>
}

const Content = ({course}) => {
  return course.parts.map((value)=><li key={value.id}>{value.name} {value.exercises}</li>)
}

const Sum = ({course}) => {
    const max = course.reduce((i, x)=> i+x.exercises, 0)
    return <p>Current exercises: {max}</p>
}

const Course = ({course}) => {
  return (
    <div>

        {course.map((course) => {
            return (
            <div key={course.id}>
                <Header title={course.name} />
                <Content course={course}/>
                <Sum course={course.parts}/>
            </div>
                
            )
          
        })}


    </div>
    
  )
};

export default Course;
