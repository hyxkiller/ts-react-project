import * as React from 'react';
import { Link, Route, Switch, BrowserRouter as Router, RouteProps } from 'react-router-dom';
import Loading from '../components/Loading';

const { lazy, Suspense } = React;
const Home = lazy(() => import(/* webpackChunkName: "Home" */ "../components/Home"));
const Banner = lazy(() => import(/* webpackChunkName: "Banner" */ "../components/Banner"));
const User = lazy(() => import(/* webpackChunkName: "User" */ "../components/User"));
const Funds = lazy(() => import(/* webpackChunkName: "Funds" */ '../components/Funds'));

const routes: RouteProps[] = [
    {
        path: '/',
        exact: true,
        component: Home,
    },
    {
        path: '/banner',
        exact: true,
        component: Banner,
    },
    {
        path: '/user',
        exact: true,
        component: User,
    },
];
const Routes = () => (
    <Suspense fallback={<Loading />}>
        <Switch>
            {
                routes.map(r => {
                    const { path, exact, component } = r;
                    const LazyDom = component;
                    // return <Route key={path} exact={exact} path={path} render={() => <LazyDom />} />
                    return <Route key={path} exact={exact} path={path} component={LazyDom} />
                })
            }
        </Switch>
    </Suspense>
)

export default Routes;