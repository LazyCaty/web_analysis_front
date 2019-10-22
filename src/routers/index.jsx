
//用于注册路由的
import React,{Component} from 'react';
import WorldMap from '../components/worldMap/WorldMap'

import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'

class Routes extends Component{
    render(){
        return(
            <Router>
                <Switch>
                    <Route exact path="/" component={WorldMap} />
                </Switch>
            </Router>
        )
    }
}

export default Routes;