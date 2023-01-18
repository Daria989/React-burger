import cardOrder from './card-order.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from '../../utils/hooks';
import { formatDate, findCorrespondingArr, unique} from '../../utils/functions';
import { TBurgerOrderObject, TIngredientType } from '../../utils/types';

function CardOrder({data}: TBurgerOrderObject){
  const dataIngredients : any = useSelector(store => store.addIngredientsList.data);
  const arrIngredientsWithoutNull = data.ingredients.filter((item: string) => item !== null);

  function findArrWithImages(arrOrderIds: Array<string>, arrAllIngredients: Array<TIngredientType>): Array<TIngredientType> {
    const arrSixImages =  unique(arrOrderIds).slice(0, 6)
    return findCorrespondingArr(arrSixImages, arrAllIngredients).map((obj: TIngredientType, index: number) => <div key={obj._id} className = {cardOrder.image_wrapper} style={{left: -index*16, zIndex: 100 - index}}><img className = {cardOrder.image} src={obj.image_mobile} alt={obj.name}/></div>)
  }

  function findPrice(arrOrderIds: Array<string>, arrAllIngredients: Array<TIngredientType>): number {
    return findCorrespondingArr(arrOrderIds, arrAllIngredients).map((obj: TIngredientType) => obj.price).reduce((previousValue: number, currentValue: number) => previousValue + currentValue, 0)
  }
 
  return (
    <>
    {dataIngredients.length > 0 ?
        <div className = {`mb-4 ${cardOrder.order}`}>
            <div className = {`mt-4 ${cardOrder.info}`}>
                <div className = {`text text_type_digits-default ${cardOrder.number}`}>{data.number}</div>
                <div className = {`text text_type_main-default text_color_inactive ${cardOrder.date}`}>{formatDate(data.createdAt)}</div>
            </div>
            <div className = {`text text_type_main-medium pb-6 pt-6 ${cardOrder.name}`}>
                {data.name}
            </div>
            <div className = {`mb-2 ${cardOrder.details}`}>
                <div className = {cardOrder.images}>
                    {findArrWithImages(arrIngredientsWithoutNull, dataIngredients)}
                </div>
                <div className = {`text text_type_digits-default ${cardOrder.price}`}>{findPrice(arrIngredientsWithoutNull, dataIngredients)}</div>
                <CurrencyIcon type="primary"/>
            </div>
        </div>
      : ''}
    </>
  )
};

export default CardOrder;
