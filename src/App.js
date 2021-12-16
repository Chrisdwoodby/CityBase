import React, { useState } from 'react';
import * as R from 'ramda';

import { animalTranslations, foodTranslations } from './translations';
import { CardContainer, CardHeader, CardContent } from './App.styled';

const FoodCard = ({
  food,
  translate,
}) => (
  <CardContainer>
    <CardHeader>{translate('name', food)}</CardHeader>
    <CardContent>{translate('meal', food)}</CardContent>
    <CardContent>{translate('description', food)}</CardContent>
  </CardContainer>
);

const AnimalCard = ({
  animal,
  translate,
}) => (
  <CardContainer>
    {console.log('chris', translate, animal)}
    <CardHeader>{translate('species', animal)}</CardHeader>
    <CardContent>Biome: {translate('biome', animal)}</CardContent>
    <CardContent>Color: {translate('color', animal)}</CardContent>
  </CardContainer>
);

// FIXME: Add your code here 
const createTranslate = (obj) => {
  const translate = (string, obj) => {
    return obj[string][translate.language];
  }
  const returnedInner = (func, language) => {
    func.translate = translate;
    func.translate.language = language
    Object.keys(obj).forEach((item) => {
      var animal = obj[item];
      var food = obj[item];
      if (func === AnimalCard) {
        func({animal, translate})
      }
      if (func === FoodCard) {
        func({food, translate})
      }
    });
  }
  return returnedInner
};

const translateAnimal = createTranslate(animalTranslations);
const translateFood = createTranslate(foodTranslations);

const App = () => {
  const [language, setLanguage] = useState('en');
  
  const TranslatedAnimalCard = translateAnimal(AnimalCard, language);
  const TranslatedFoodCard = translateFood(FoodCard, language);
  
  const animals = ['tiger', 'lion', 'hippo', 'platypus'];
  const foods = ['cake', 'pizza', 'hotdog', 'pancake'];

  const TranslatedAnimalCards = animals.map(a => <TranslatedAnimalCard animal={a} />);
  const TranslatedFoodCards = foods.map(f => <TranslatedFoodCard food={f} />);
 
  return (
    <div>
      <select id="language" value={language} onChange={() => setLanguage(document.getElementById("language").options[document.getElementById("language").selectedIndex].value)}>
        <option value="en">English</option>
        <option value="es">Español</option>
        <option value="ru">русский</option>
        <option value="fi">Suomalainen</option>
      </select>
      <div style={{ display: 'flex' }}>
        {TranslatedAnimalCards}
      </div>
      <div style={{ display: 'flex' }}>
        {TranslatedFoodCards}
      </div>
    </div>
  );
}

export default App;