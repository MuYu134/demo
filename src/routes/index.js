import Home from '../views/Home/Home'
import { Navigate } from 'react-router-dom'

// 配置路由表
export default [
    {
        path: "/home",
        element: <Home />,
    },
    {
        path: "/",
        element: <Navigate to="/home" replace={false} />
    },
]