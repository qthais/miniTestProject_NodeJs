import PropTypes from 'prop-types'
function Greeting(props) {
    return (props.isAllowed? <h2 className='welcome-msg'>Hello {props.username}</h2>:<h2 className='default-msg'>Please enter to continue</h2>)
}
Greeting.propTypes={
    isAllowed:PropTypes.bool,
    username:PropTypes.string
}
Greeting.defaultProps={
    isAllowed:false
}
export default Greeting