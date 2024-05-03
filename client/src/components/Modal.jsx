import React, { useEffect } from 'react';

const Modal = () => {
    useEffect(() => {
        handleOpenModal();
    }, []);

    const handleOpenModal = () => {
        const modal = document.querySelector("#modal");
        modal.showModal();
    };

    const handleCloseModal = () => {
        const modal = document.querySelector("#modal");
        modal.close();
    };

    return (
        <dialog id="modal">
            <div className="modal-content">
                <h2>Enter your credentials.</h2>
                <input id="E-mail" type="text" placeholder="E-mail" />
                <input id="Password" type="text" placeholder="Password" />
                <button onClick={handleCloseModal}>Confirm</button>
            </div>
        </dialog>
    );
};

export default Modal;
