import './Home.css';

import BackgroundText from '../../components/BackgroundText/BackgroundText';
import HomeCard from '../../components/HomeCard/HomeCard';

export default function Home() {

  return (
    <div className='Home'>
      <div className='background-text-comp'>
        <BackgroundText />
      </div>
      <div className='home-card'>
        <HomeCard />
      </div>
    </div>
  );
}