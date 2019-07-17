import * as React from 'react';
import 'styles/index.scss';
const BTC = require('assets/BTC.jpeg');
import { add } from '../../utils/math';


const Home = () => {
    return <div className="red">
        <img src={BTC} alt=""/>
        Home
    </div>
}
export default Home;