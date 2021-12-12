import React, { useState } from 'react';
import * as R from 'ramda';

import { animalTranslations, foodTranslations } from './translations';
import { CardContainer, CardHeader, CardContent } from './App.styled';

const FoodCard = ({
  food,
  translate,
}) => (
  <CardContainer>
    <CardHeader>{('name', food)}</CardHeader>
    <CardContent>{('meal', food)}</CardContent>
    <CardContent>{('description', food)}</CardContent>
  </CardContainer>
);

const AnimalCard = ({
  animal,
  translate,
}) => (
  <CardContainer>
    {console.log('chris', translate)}
    <CardHeader>{AnimalCard.translate('species', AnimalCard.animal)}</CardHeader>
    <CardContent>Biome: {AnimalCard.translate('biome', AnimalCard.animal)}</CardContent>
    <CardContent>Color: {AnimalCard.translate('color', AnimalCard.animal)}</CardContent>
  </CardContainer>
);
// const AnimalCard = ({
//   animal,
//   translate,
// }) => (
//   <CardContainer>
//     {console.log('chris', translate, animal)}
//     <CardHeader>{translate('species', animal)}</CardHeader>
//     <CardContent>Biome: {translate('biome', animal)}</CardContent>
//     <CardContent>Color: {translate('color', animal)}</CardContent>
//   </CardContainer>
// );

// FIXME: Add your code here 
const createTranslate = (obj) => {
  const translate = (string, obj) => {
    for (var item in obj) {
      if (item === string) {
        return obj[item][translate.language]
      }
    }
  }
  const returnedInner = (func, language) => {
    var promises = [];
    func.translate = translate;
    func.translate.language = language
    Object.keys(obj).forEach((item) => {
      var name = obj[item];
      func.animal = obj[item];
      promises.push(func({name, translate}))
    })
    console.log(promises)
    return func
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

  const TranslatedAnimalCards = animals.map(a => <TranslatedAnimalCard key={a} animal={a} />);
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
        {/* {TranslatedFoodCards} */}
      </div>
    </div>
  );
}

export default App;


// const createTranslate = (obj) => {
//   const translate = (string, animalObj) => {
//     // for (var item in animalObj) {
//         // console.log(item === string)
//       // if (item === string && animalObj !== undefined) {
//         // console.log(details)
        
//         return 'animalObj'
//     //   }
//     // }
//   }
//   // return <AnimalCard animal={animal} translate={translate}/>
//     var inner = function(func, language){
//       for (var keys in obj) {
//         var details = obj[keys];
//         for (var key in details) {
//           // console.log(details)
//           var animal = details;
//           var food = details;
//         }
//         if (func === AnimalCard) {
//           AnimalCard({animal})
//           return translate(key, animal);
//         } 
//         if (func === FoodCard) {
          
//           // return FoodCard({food, translate}); 
//         }
//       }
//     }
//     return inner
//   };