import done from '../../images/done.png';
import orderDetails from './order-details.module.css';
import { useSelector } from '../../utils/hooks';
import Loader  from '../loader/loader';

function OrderDetails() {
    const res = useSelector(store => store.addOrderDetails.data.order);

    return (
        <>
            {res === 0 ? 
                <Loader />
            : <div data-testid = 'orderNumber' className={`mr-25 ml-25 mt-4 mb-8 text text_type_digits-large`}>{res}</div>}
            <div className={`mb-15 text text_type_main-medium`}>идентификатор заказа</div>
            <div className={`mb-15 ${orderDetails.image}`}>
                <img src={done} alt="done"></img>
            </div>
            <div className={`mb-2 text text_type_main-small`}>Ваш заказ начали готовить</div>
            <div className={`mb-30 text text_type_main-small ${orderDetails.text}`}>Дождитесь готовности на орбитальной станции</div>
        </>
    )
}

export default OrderDetails;