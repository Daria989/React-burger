import burgerConstructor from './burger-constructor.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import ConstructorItem from '../constructor-item/constructor-item';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useCallback} from 'react';
import {getCookie } from '../../services/cookie';
import { getConstructorData, addConstructorElement, deleteConstructorElement } from '../../services/actions/constructorActions';
import { getOrderDetails} from '../../services/actions/sendOrderAction';
import { useDrop} from 'react-dnd';
import uuid from 'react-uuid';
import { useDispatch, useSelector } from '../../utils/hooks';
import { useHistory } from 'react-router-dom';
import {useLocation} from "react-router-dom";
import {TIngredientTypeWithIndex} from '../../utils/types'

function BurgerConstructor() {
  const data: any = useSelector(store => store.addConstructorList.data);

  const user = useSelector((store) => store.authReducer.name);
  const accessToken = getCookie('token');
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  const handleClose = (id: string) => {
    dispatch(deleteConstructorElement(id))
  };

  const [, dropTargetRef] = useDrop({
    accept: 'ingredient',
    drop(item: TIngredientTypeWithIndex) {
      dispatch(addConstructorElement({...item, dragId: uuid()}))
    }
  });

  function findNotBun(arr: TIngredientTypeWithIndex[]) {
    return arr.filter(obj => obj.type !== 'bun');
  }

  function findBun(arr: TIngredientTypeWithIndex[]) {
    const bun = arr.find((element) => element.type === 'bun')
    if (bun === undefined)
      return [];
    else
      return [bun]
  }

  function getArrOfIngredients(arr: TIngredientTypeWithIndex[]) {
    return findNotBun(arr).concat(findBun(arr)).concat(findBun(arr));
  }

  function findIngredientsIds(arr: TIngredientTypeWithIndex[]) {
    return getArrOfIngredients(arr).map(obj => obj._id);
  }

  function priceSum(arr: TIngredientTypeWithIndex[]) {
    return getArrOfIngredients(arr).map(obj => obj.price).reduce((previousValue, currentValue) => previousValue + currentValue, 0)
  }

  function placeOrder() {
    if (user && accessToken) {
      const obj = {
        "ingredients": findIngredientsIds(data)
      };
      dispatch(getOrderDetails(obj));
      history.push({
        pathname: '/',
        state: {
          background: location
        }
      });
    } else {
        history.replace({ pathname: '/login' })
    }
   }

  const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
    const dragCard = data[dragIndex];
    const newCards = [...data];
    newCards.splice(dragIndex, 1);
    newCards.splice(hoverIndex, 0, dragCard);
    dispatch(getConstructorData(newCards))
  }, [data, dispatch]);

  return (
    <>
      { data.length > 0 ?
      <div className={`mt-25 pl-4 ${burgerConstructor.container}`}>
          <div data-testid = 'dropConstructor' ref={dropTargetRef} className={`text text_type_main-medium ${burgerConstructor.burger}`}>
              <div className={`mb-4 mr-2 pl-7 ${burgerConstructor.element}`}>
                {findBun(data).length > 0?
                <ConstructorElement
                  type="top"
                  isLocked={true}
                  text={`${findBun(data)[0].name} (верх)`}
                  price={findBun(data)[0].price}
                  thumbnail={findBun(data)[0].image}
                />
                : <p>Выберите булку</p>
                }
              </div>
            
              <div className={burgerConstructor.box}>
                {findNotBun(data).map((item, index) =>
                    <ConstructorItem item={item} index={index} key={item.dragId} moveCard={moveCard} handleClose={() => handleClose(item.dragId)}/>
                  )}
              </div>

              <div className={`mt-2 pl-7 ${burgerConstructor.element}`}>
                {findBun(data).length > 0 ?
                <ConstructorElement
                  type="bottom"
                  isLocked={true}
                  text={`${findBun(data)[0].name} (низ)`}
                  price={findBun(data)[0].price}
                  thumbnail={findBun(data)[0].image}
                />
                : ''
                }
              </div>
          </div>
          <div className={`mt-10 ${burgerConstructor.button}`}>
            <div className={`text text_type_digits-medium ${burgerConstructor.summ}`}>
              {priceSum(data)}
            </div>
            <CurrencyIcon type="primary" />
            {findBun(data).length > 0 ?
            <Button type="primary" size="medium" onClick={placeOrder}>
              Оформить заказ
            </Button>
            :
            <Button type="primary" disabled  size="medium" onClick={placeOrder}>
              Оформить заказ
            </Button>
            }
          </div>
        </div>
        :
        <div data-testid = 'dropEmptyBox' className={`mt-25 pl-4 ${burgerConstructor.empty_container}`}>
          <div ref={dropTargetRef} className={`text text_type_main-medium ${burgerConstructor.empty_burger}`}>
            <p>Пожалуйста, перенесите сюда булку и ингредиенты для создания заказа</p>
          </div>
        </div>
        }
    </>
  )
}

export default BurgerConstructor;
