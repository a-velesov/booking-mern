import { useEffect, useState } from 'react';
import { allHotels } from '../state/actions/hotel';
import SmallCard from '../components/cards/SmallCard';

const Home = () => {

  const [ hotels, setHotels ] = useState([]);

  useEffect(() => {
    loadAllHotels();
  }, []);

  const loadAllHotels = async() => {
    let res = await allHotels();
    setHotels(res.data);
  };

  return (
    <>
      <div className="container-fluid bg-secondary p-5 text-center">
        <h1>All hotels</h1>
      </div>
      <div className="container-fluid">
        <br />
        { hotels && hotels.map((h) => (
          <SmallCard
            key={ h._id }
            h={ h }
          />
        ))
        }
      </div>
    </>
  );
};

export default Home;