import card from './card.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { getIngredientDetails } from '../../services/actions/ingredientsAction';
import { useDrag } from "react-dnd";
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import {Link, useLocation} from "react-router-dom";
import {TIngredientType, TIngredientTypeCardDescription} from '../../utils/types'
import { useDispatch, useSelector } from '../../utils/hooks';

function Card({description}: TIngredientTypeCardDescription) {

  const data: any = useSelector(store => store.addConstructorList.data);
  const location = useLocation();

  const {name, type, price, image, _id, key, ...details} = description;
  const dispatch = useDispatch();

  const [{opacity}, ref] = useDrag({
    type: "ingredient",
    item: description,
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.5 : 1
    })
  });

  function getDetails() {
    dispatch(getIngredientDetails(description));
  }

  let counter = data.filter((element: TIngredientType) => element.name === name).length
  if (type === 'bun') counter--;

  return (
      <div data-testid = 'link' onClick={getDetails} ref = {ref} style={{ opacity }} className={`m-3 ${card.item}`}>
        <Link 
          to={{
            pathname: `/ingredients/${_id}`,
            state: { background: location },
          }}
          // data-testid = 'link'
          className={card.link}>
          <div className={card.image}>
            <img src={image} alt={card.name}/>
            {counter > 0? <Counter count={counter} size="small" /> : null}
          </div>
          <div className={`mt-1 mb-1 ${card.price}`}>
            <p className={'mr-2 text text_type_digits-default'}>{price}</p>
            <CurrencyIcon type="primary"/>
          </div>
          <div className={`${card.name} text text_type_main-default`}>
            {name}
          </div>
        </Link>
      </div>      
  );
};

export default Card;