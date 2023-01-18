import {useEffect} from 'react';
import ReactDOM from 'react-dom';
import popup from './modal.module.css';
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';
import {TModal} from '../../utils/types'

const modalRoot = document.getElementById("react-modals")!;

function Modal({onClose, children}: TModal) {
    useEffect(() => {
        const onEscapeEvent = (e: KeyboardEvent) => e.key === "Escape" ? onClose() : null
        document.body.addEventListener('keydown', onEscapeEvent)
        
        return () => {
            document.body.removeEventListener('keydown', onEscapeEvent)
        }
    }, [])

        return ReactDOM.createPortal(
        <>
            <ModalOverlay onClose={onClose}/>
            <div className = {popup.content} >
                <div className={popup.header}>
                    <div data-testid = 'close' className={`mt-10  mr-10 ${popup.closeIcon}`}>
                        <CloseIcon  type="primary" onClick={onClose}/>
                    </div>
                </div>
                {children}
            </div>
        </>,
        modalRoot
    )
}

export default Modal;