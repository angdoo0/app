import logo from './logo.svg';
import './App.css';
import React from 'react';

const jsonLocalStorage = {
  setItem: (key, value) => {
    return localStorage.setItem(key, JSON.stringify(value))
  },
  getItem: (key) => {
    return JSON.parse(localStorage.getItem(key));
  },
};

// component
function Title(props) {
  return <h1>{props.children}</h1>;
};

// component
const Form = ({ updateCounter }) => {
  const [value, setValue] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');

  // 한글 검증
  const hangul = (text) => /[가-힣| ㅏ-ㅣ|ㄱ-ㅎ]/.test(text);

  function handleInputChange(data) {
    const userValue = data.target.value;

    if (hangul(userValue)) {
      setErrorMessage('한글은 입력할 수 없습니다.');
    } else {
      setErrorMessage('');
    }

    setValue(userValue.toUpperCase());
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    setErrorMessage('');
    if (value === '') {
      setErrorMessage('값이 없으므로 추가할 수 없습니다.');
      return
    }
    updateCounter();
  }

  return (
    <form action="" onSubmit={handleFormSubmit}>
      <input type="text" name="name" placeholder="상품명을 입력하세요" onChange={handleInputChange} value={value} />
      <button type="submit">추가</button>
      <p style={{ color: '#f00' }}>{errorMessage}</p>
    </form>
  );
};

// component
const MainCard = ({ src, handleHeartClick, choiceFavorites }) => {
  const heartIcon = choiceFavorites ? '💖' : '🤍';

  return (
    <div className="main-card">
      <img
        src={src}
        alt="올리브 오일"
        width="400"
        style={{ border: "1px solid #ff0" }}
      />
      <button onClick={handleHeartClick}>{heartIcon}</button>
    </div>
  );
};

const FoodItem = ({ src }) => {
  return (
    <li>
      <img
        src={src}
        alt="음식"
        style={{
          width: "150px",
          height: "100px",
          backgroundSize: "contain",
        }} />
    </li>
  );
};

// component
const Favorites = ({ favorites }) => {
  return (
    <ul className="favorites">
      {favorites.map((food, idx) => <FoodItem src={food} key={idx} />)}
    </ul>
  );
};

// 앱 컴포넌트=================================================
const App = () => {
  const foodOne = 'img/food-one.jpg';
  const foodTwo = 'img/food-Two.jpg';
  const foodThree = 'img/food-Three.jpg';
  const foods = [foodOne, foodTwo, foodThree];
  const [mainFood, setMainFood] = React.useState(foodOne);
  const [counter, setCounter] = React.useState(() => {
    return jsonLocalStorage.getItem('counter');
  });
  const [favorites, setfavorite] = React.useState(() => {
    return jsonLocalStorage.getItem('favorites') || [];
  })

  const choiceFavorites = favorites.includes(mainFood);

  function updateCounter(event) {
    setCounter((pre) => {
      const nextCounter = pre + 1;
      jsonLocalStorage.setItem('counter', nextCounter);
      return nextCounter;
    })
    setMainFood(foodTwo);// 그냥 값 넣음
  }

  function handleHeartClick() {
    setfavorite((pre) => {
      const nextFavorites = [...pre, mainFood];
      jsonLocalStorage.setItem('favorites', nextFavorites);
      return nextFavorites;
    });
  };

  return (
    <div>
      <Title>페이지{counter}</Title>
      <Form updateCounter={updateCounter} />
      <MainCard src={mainFood} handleHeartClick={handleHeartClick} choiceFavorites={choiceFavorites} />
      <Favorites favorites={favorites} />
    </div>
  )
};

export default App;
