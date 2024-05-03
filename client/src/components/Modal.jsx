import { useRef, useEffect } from 'react';



const Modal = ({onClick}) => {
    useEffect(() => {
        dialogRef.current.showModal()
    }, [])

    const dialogRef = useRef(null)

    return (
        <dialog ref = {dialogRef} id="modal">
            <div className="modal-content">
                <h2>Enter your credentials.</h2>
                <input id="E-mail" type="text" placeholder="E-mail" />
                <input id="Password" type="text" placeholder="Password" />
                <button onClick = {onClick}>Confirm</button>
            </div>
        </dialog>
    );
};

export default Modal;
