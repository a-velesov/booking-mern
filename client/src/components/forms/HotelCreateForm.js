import { DebounceInput } from 'react-debounce-input';
import { DatePicker, Select } from 'antd';
import { format, subDays } from 'date-fns';
import { useClickOutside } from '../../hooks/useClickOutside';
import { useRef, useState } from 'react';
import { fetchCities } from '../../api/placeSuggestion';
import { useSelector } from 'react-redux';
import { createHotel } from '../../state/actions/hotel';
import { toast } from 'react-toastify';

const { Option } = Select;

const HotelCreateForm = ({ setPreview }) => {

  const suggestionRef = useRef(null);
  const [ suggestions, setSuggestions ] = useState([]);
  const [ showSuggestions, setShowSuggestions ] = useState(false);
  const [ values, setValues ] = useState({
    title: '',
    content: '',
    location: '',
    image: '',
    price: '',
    from: '',
    to: '',
    bed: '',
  });

  const { auth } = useSelector((state) => ({ ...state }));
  const { token } = auth;

  const {
          title,
          content,
          price,
          location,
          image,
          from,
          to,
          bed,
        } = values;

  useClickOutside(suggestionRef, () => setShowSuggestions(false));

  const clickSuggestion = (s) => {
    setValues({
      ...values,
      location: s,
    });
    setShowSuggestions(false);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    let hotelData = new FormData();
    hotelData.append('title', title);
    hotelData.append('content', content);
    hotelData.append('location', location);
    hotelData.append('price', price);
    image && hotelData.append('image', image);
    hotelData.append('from', from);
    hotelData.append('to', to);
    hotelData.append('bed', bed);

    console.log([ ...hotelData ]);

    let res = await createHotel(token, hotelData);
    console.log('HOTEL CREATE RES', res);

    toast('New hotel is posted');
  };

  const handleImageChange = (e) => {
    setPreview(URL.createObjectURL(e.target.files[0]));
    setValues({
      ...values,
      image: e.target.files[0],
    });
  };

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };


  const onSearchInputChanged = (e) => {
    setValues({
      ...values,
      location: e.target.value,
    });
    fetchCities(e.target.value).then((res) => {
      setSuggestions(res);
      setShowSuggestions(true);
    });
  };

  const disabledDate = (current) => {
    return format(new Date(current), 'yyyy-LL-dd') <= format(subDays(new Date(), 1), 'yyyy-LL-dd');
  };

  return (
    <form onSubmit={ handleSubmit }>
      <div className="form-group">
        <label className="btn btn-outline-secondary m-2 text-left">
          Image
          <input
            type="file"
            name="image"
            onChange={ handleImageChange }
            accept="image/*"
            hidden
          />
        </label>

        <input
          type="text"
          name="title"
          onChange={ handleChange }
          placeholder="Title"
          className="form-control m-2"
          value={ title }
        />

        <textarea
          name="content"
          onChange={ handleChange }
          placeholder="Content"
          className="form-control m-2"
          value={ content }
        />

        <DebounceInput
          className="form-control ml-2 mr-2"
          placeholder="Location"
          element={ 'input' }
          debounceTimeout={ 400 }
          value={ location }
          onChange={ onSearchInputChanged }
        />

        {
          showSuggestions && (
            <ul ref={ suggestionRef } style={ {
              listStyle: 'none',
              margin: '15px auto',
              padding: '10px 30px',
              border: '1px solid lightgray',
              width: '90%',
            } }
            >
              {
                suggestions.slice(0, 6).map((s, i) => (
                  <li
                    key={ i }
                    style={ {
                      padding: '10px 0',
                      cursor: 'pointer',
                    } }
                    onClick={ () => clickSuggestion(s) }
                  >
                    { s }
                  </li>
                ))
              }
            </ul>
          )
        }

        <input
          type="number"
          name="price"
          onChange={ handleChange }
          placeholder="Price"
          className="form-control m-2"
          value={ price }
        />

        <Select
          onChange={ (value) => setValues({
            ...values,
            bed: value,
          }) }
          className="w-100 m-2"
          size="large"
          placeholder="Number of beds"
        >
          <Option key={ 1 }>
            1
          </Option>
          <Option key={ 2 }>
            2
          </Option>
          <Option key={ 3 }>
            3
          </Option>
          <Option key={ 4 }>
            4
          </Option>
        </Select>
      </div>

      <DatePicker
        placeholder="From date"
        className="form-control m-2"
        disabledDate={ (current) => disabledDate(current) }
        onChange={ (date, dateString) =>
          setValues({
            ...values,
            from: dateString,
          }) }
      />

      <DatePicker
        placeholder="To date"
        className="form-control m-2"
        disabledDate={ (current) => disabledDate(current) }
        onChange={ (date, dateString) =>
          setValues({
            ...values,
            to: dateString,
          }) }
      />

      <button className="btn btn-outline-primary m-2">Save</button>
    </form>
  );
};

export default HotelCreateForm;