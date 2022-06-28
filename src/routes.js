import {HomePage} from '../src/pages/HomePage'
import {ContactApp} from '../src/pages/ContactApp'
import {StatisticPage} from '../src/pages/StatisticPage'

const routes = [
{
    path: '/',
    component: <HomePage />,
    label: 'Home',
},
{
    path: '/contacts',
    component: <ContactApp />,
    label: 'Contacts',
},
{
    path: '/statistics',
    component: <StatisticPage />,
    label: 'Statistics',
},
]

export default routes