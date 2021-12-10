import React, { useState } from 'react';
import * as R from 'ramda';

import { animalTranslations, foodTranslations } from './translations';
import { CardContainer, CardHeader, CardContent } from './App.styled';

const FoodCard = ({
  food,
  translate,
}) => (
  <CardContainer>
    {console.log(food)}
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
    {console.log(animal)}
    <CardHeader>{translate('species', animal)}</CardHeader>
    <CardContent>Biome: {translate('biome', animal)}</CardContent>
    <CardContent>Color: {translate('color', animal)}</CardContent>
  </CardContainer>
);

// const translate = (string, details) => {
//   for (var item in details) {
//     if (item === string && details !== undefined) {
//       // console.log(details[item]['en'])
//       return details[item]['en'];
//     }
//   }
// }
// FIXME: Add your code here 
const createTranslate = (obj) => {
  const translate = (string, animalObj) => {
    for (var item in animalObj) {
        // console.log(item === string)
      if (item === string && animalObj !== undefined) {
        // console.log(details)
        return animalObj[item]['en'];
      }
    }
  }
    var inner = function(func, language){
      for (var keys in obj) {
        var details = obj[keys];
        for (var key in details) {
          var animal = details;
          var food = details;
        }
        if (func === AnimalCard) {
          AnimalCard({animal, translate});
          return translate(key, animal)
        } 
        if (func === FoodCard) {
          FoodCard({food, translate}); 
          return translate(key, food)
        }
      }
    }
    
    return inner
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
  console.log(TranslatedAnimalCards) // issue is here!!!!!!!!!
  const TranslatedFoodCards = foods.map(f => <TranslatedFoodCard food={f} />);

  return (
    <div>
      <select value={language} >
        <option value="en">English</option>
        <option value="es">Español</option>
        <option value="ru">русский</option>
        <option value="fi">Suomalainen</option>
      </select>
      <div style={{ display: 'flex' }}>
        {TranslatedAnimalCards}
      </div>
      <div style={{ display: 'flex' }}>
        {/* {TranslatedFoodCards} */}
      </div>
    </div>
  );
}

export default App;