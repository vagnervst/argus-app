import { withCookies } from 'react-cookie'
import { withRouter } from 'react-router'

const CookieWrapper = Component => withCookies(withRouter(Component))

export default CookieWrapper
