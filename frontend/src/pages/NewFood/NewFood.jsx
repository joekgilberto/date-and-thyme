import './NewFood.css';

import BackgroundText from '../../components/BackgroundText/BackgroundText';
import FoodForm from '../../components/FoodForm/FoodForm';

export default function NewFood() {
  return (
    <div className='NewFood'>
      <div className='background-text-comp'>
        <BackgroundText />
      </div>
      <FoodForm />
    </div>
  );
}