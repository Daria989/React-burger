import feed from './feed.module.css';
import { useSelector, useDispatch } from '../utils/hooks';
import {WS_CONNECTION_START, WS_CONNECTION_CLOSED} from '../services/actions/wsActions';
import { useEffect} from 'react';
import CardOrder from '../components/card-order/card-order';
import { TMessage, TBurgerOrder } from '../utils/types';
import {Link, useLocation} from "react-router-dom";


function Feed() {
  const dispatch = useDispatch();
  const location = useLocation();
  const data: TMessage | null  = useSelector((store) => store.wsReducer.messages);

  useEffect(() => {
    dispatch({type: WS_CONNECTION_START});
    return () => {
        dispatch({type: WS_CONNECTION_CLOSED})
    }
}, [dispatch]);

if (!data) {
  return null
}

function doneOrders(arr: Array<TBurgerOrder>) {
  return arr.slice(0, 30).filter((obj: TBurgerOrder) => obj.status === 'done').map((obj: TBurgerOrder) => <div key={obj._id} className = {`text text_type_digits-default mr-2 ${feed.number}`}>{obj.number}</div>)
}

function notDone(arr: Array<TBurgerOrder>) {
  return arr.filter((obj: TBurgerOrder) => obj.status !== 'done').map((obj: TBurgerOrder) => <div key={obj._id} className = {`text text_type_digits-default mr-2 ${feed.number_in_work}`}>{obj.number}</div>)
}
    
return (
    <div className = {feed.feed}>
      <div className = {`mt-25 ${feed.container}`}>
        <div className = {`mr-15 ${feed.orders}`}>
          <p className="text text_type_main-large pt-4 pl-2 pb-6">
            Лента заказов
          </p>
          <div className={feed.scroll}>
            {data.orders.map((obj: any) => 
        <Link
          to={{
            pathname: `${location.pathname}/${obj.number}`,
            state: { background: location }
          }}
          key={obj._id}
          className={feed.link}>
            <CardOrder data = {obj}/>
        </Link>    
            )}
          </div>
        </div>
        <div className = {feed.table}>
          <div className = {`mb-15 ${feed.list}`}>
            <div className = {`mb-10 ${feed.ready}`}>
              <div className = {`text text_type_main-medium mb-4 ${feed.header}`}>Готовы</div>
              <div className = {feed.ready_list}> 
                {doneOrders(data.orders)}
              </div>
            </div>
            <div className = {`mr-9 mb-4 ${feed.ready}`}>
              <div className = {`text text_type_main-medium mb-4 ${feed.header}`}>В работе</div>
              <div className = {feed.ready_list}> 
                {notDone(data.orders)}
              </div>
            </div>
          </div>
          <div className = {`text text_type_main-medium ${feed.done}`}>Выполнено за все время:</div>
          <div className = {`text text_type_digits-large mb-15 ${feed.amount}`}>{data.total}</div>
          <div className = {`text text_type_main-medium ${feed.done}`}>Выполнено за сегодня:</div>
          <div className = {`text text_type_digits-large mb-15 ${feed.amount}`}>{data.totalToday}</div>
        </div>
      </div>
    </div>
  )
}

export default Feed;